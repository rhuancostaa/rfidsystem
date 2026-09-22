import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const form = document.getElementById("formCadastro");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.Email.value.trim();
    const senha = form.Senha.value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            window.location.href = "../dashboard/dashindex.html";
        })
        .catch((error) => {
            console.error(error);
            alert("Email ou senha inválidos.");
        });
});