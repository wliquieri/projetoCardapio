import {scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(senhaUsuario, usuario){
    const hashTeste = scryptSync(senhaUsuario, usuario.salSenha, 64);
    const hashReal = Buffer.from(usuario.hashSenha, "hex");

    const autenticado = timingSafeEqual(hashTeste, hashReal);

    return autenticado;
}

export default autenticarUsuario;