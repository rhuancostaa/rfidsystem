// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDT_2EHqvMKMMNgYUbCsUlf0fgBmhjwIvk",
    authDomain: "projeto-iot-acb2f.firebaseapp.com",
    databaseURL: "https://projeto-iot-acb2f-default-rtdb.firebaseio.com",
    projectId: "projeto-iot-acb2f",
    storageBucket: "projeto-iot-acb2f.firebasestorage.app",
    messagingSenderId: "321492311561",
    appId: "1:321492311561:web:5211ec3fd0732adff622d8"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const db = getDatabase(app);

// Inicializa a Autenticação
const auth = getAuth(app);

// Exporta o banco e a autenticação
export { db, auth };