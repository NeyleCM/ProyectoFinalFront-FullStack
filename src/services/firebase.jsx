import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxXsb5F1MG9g4JpqrFj36lIGkQqCA83Ew",
    authDomain: "proyectofinalback-3759f.firebaseapp.com",
    projectId: "proyectofinalback-3759f",
    storageBucket: "proyectofinalback-3759f.firebasestorage.app",
    messagingSenderId: "752475542461",
    appId: "1:752475542461:web:6f3cf54faeb09be8f238d4"
};

const app = initializeApp(firebaseConfig);
// Desactivar reCAPTCHA (si es necesario)
const auth = getAuth(app);

auth.useDeviceLanguage();

export { auth };