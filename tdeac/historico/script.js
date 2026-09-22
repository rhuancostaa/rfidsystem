import { db, auth } from "../firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

document.getElementById("sair").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../login/index.html";
    });
});

const tabela = document.querySelector("table");

onValue(ref(db, "acessos"), (snapshot) => {
    const acessos = snapshot.val() || {};

    // Remove todas as linhas exceto o cabeçalho
    tabela.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

    Object.values(acessos).reverse().forEach((acesso) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${acesso.nome}</td>
            <td>${acesso.data}</td>
            <td>${acesso.status === "liberado" ? "🟢 LIBERADO" : "🔴 NEGADO"}</td>
        `;
        tabela.appendChild(tr);
    });
});