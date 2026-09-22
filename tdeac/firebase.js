// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "
    authDomain: "
    databaseURL: "
    projectId: "
    storageBucket: "
    messagingSenderId: "
    appId: "
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const db = getDatabase(app);

// Inicializa a Autenticação
const auth = getAuth(app);

// Exporta o banco e a autenticação
export { db, auth };
