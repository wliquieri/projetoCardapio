import { emitirAutenticarUsuario } from "./socket-front-login.js";

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", (e) =>{
    e.preventDefault();

    const email   = formLogin["inputEmail"].value;
    const senha     = formLogin["inputSenha"].value;

    emitirAutenticarUsuario({email, senha})
})
