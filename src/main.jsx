import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'

const firebaseConfig = {
  apiKey: "AIzaSyAq7hjl4XDtTfr9Q7HleAYZUO_Q3-CWo20",
  authDomain: "msd-deca.firebaseapp.com",
  projectId: "msd-deca",
  storageBucket: "msd-deca.firebasestorage.app",
  messagingSenderId: "584595139314",
  appId: "1:584595139314:web:818dc724c136382b2efe6b",
  measurementId: "G-GEEKVPKTDZ"
};

const app = initializeApp(firebaseConfig);

export default app;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </StrictMode>,
)
