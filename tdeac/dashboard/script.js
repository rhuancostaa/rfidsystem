import { db, auth } from "../firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Navegação
document.getElementById("cadastro").addEventListener("click", () => {
    window.location.href = "../simulador de cadastro/index.html";
});
document.getElementById("historico").addEventListener("click", () => {
    window.location.href = "../historico/index.html";
});
document.getElementById("sair").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../login/index.html";
    });
});

// Data de hoje no formato usado no histórico (dd/mm/aaaa)
function hoje() {
    const d = new Date();
    return String(d.getDate()).padStart(2, "0") + "/" +
           String(d.getMonth() + 1).padStart(2, "0") + "/" +
           d.getFullYear();
}

// Total de tags cadastradas
onValue(ref(db, "tags"), (snapshot) => {
    const tags = snapshot.val() || {};
    document.getElementById("tags").textContent = Object.keys(tags).length;
});

// Estatísticas de acessos + último acesso
onValue(ref(db, "acessos"), (snapshot) => {
    const acessos = snapshot.val() || {};
    const lista = Object.values(acessos);
    const dataHoje = hoje();

    const acessosHoje = lista.filter(a => a.data === dataHoje);
    const liberados = acessosHoje.filter(a => a.status === "liberado");
    const negados = acessosHoje.filter(a => a.status === "negado");

    document.getElementById("acess").textContent = acessosHoje.length;
    document.getElementById("acepts").textContent = liberados.length;
    document.getElementById("denied").textContent = negados.length;

    if (lista.length > 0) {
        const ultimo = lista[lista.length - 1];
        document.getElementById("name").textContent = ultimo.nome;
        document.getElementById("date").textContent = ultimo.data;
        document.getElementById("time").textContent = ultimo.hora;
        document.getElementById("action").textContent =
            ultimo.status === "liberado" ? "✅Liberado" : "🔴Negado";
    }
});