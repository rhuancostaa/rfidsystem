import { db } from "../firebase.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const form = document.querySelector("form");
const btnCadastrar = document.getElementById("cadastrar");
const selectStatus = document.getElementById("status");

// Atualiza o texto do botão conforme o status selecionado
function atualizarTextoBotao() {
    btnCadastrar.textContent = selectStatus.value === "desativada"
        ? "Desativar"
        : "Cadastrar";
}

selectStatus.addEventListener("change", atualizarTextoBotao);
atualizarTextoBotao(); // define o texto correto já no carregamento da página

btnCadastrar.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomecadastro").value.trim();
    const uid = document.getElementById("uid").value.trim().toUpperCase();
    const status = selectStatus.value;

    if (!nome || !uid) {
        alert("Preencha nome e UID da tag.");
        return;
    }

    // Usa o UID como chave -> recadastrar o mesmo UID atualiza, não duplica
    const tagRef = ref(db, `tags/${uid}`);

    set(tagRef, {
        nome,
        uid,
        status
    })
        .then(() => {
            alert(status === "desativada" ? "Tag desativada com sucesso!" : "Tag cadastrada com sucesso!");
            form.reset();
            atualizarTextoBotao();
        })
        .catch((error) => {
            console.error(error);
            alert("Erro ao cadastrar tag.");
        });
});

// Simulação de leitura da tag (enquanto não há ESP32)
const btnSimular = document.getElementById("simular");
const resultado = document.getElementById("resultadoSimulacao");

btnSimular.addEventListener("click", async () => {
    const uidLido = document.getElementById("uidSimulado").value.trim().toUpperCase();

    if (!uidLido) {
        alert("Digite o UID da tag.");
        return;
    }

    // Busca direta pela chave, já que o UID é a chave do registro
    const snapshot = await get(ref(db, `tags/${uidLido}`));
    const tagEncontrada = snapshot.exists() ? snapshot.val() : null;

    const agora = new Date();
    const data = String(agora.getDate()).padStart(2, "0") + "/" +
                 String(agora.getMonth() + 1).padStart(2, "0") + "/" +
                 agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0") + ":" +
                 String(agora.getMinutes()).padStart(2, "0");

    const liberado = tagEncontrada && tagEncontrada.status === "ativa";

    await set(ref(db, `acessos/${Date.now()}`), {
        nome: tagEncontrada ? tagEncontrada.nome : "Desconhecido",
        data,
        hora,
        status: liberado ? "liberado" : "negado"
    });

    resultado.textContent = liberado
        ? `✅ Acesso liberado para ${tagEncontrada.nome}`
        : "🔴 Acesso negado (tag não cadastrada ou desativada)";
});