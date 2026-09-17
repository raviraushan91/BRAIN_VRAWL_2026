import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDs2dGhYPoE_rLcyjjM7SzBfsAW75aPQkU",
    authDomain: "brain-brawl-2026.firebaseapp.com",
    databaseURL: "https://brain-brawl-2026-default-rtdb.firebaseio.com",
    projectId: "brain-brawl-2026",
    storageBucket: "brain-brawl-2026.firebasestorage.app",
    messagingSenderId: "826324152250",
    appId: "1:826324152250:web:a73d298c90e1cc2ad1f783"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);