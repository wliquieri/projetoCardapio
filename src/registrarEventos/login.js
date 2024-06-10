import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
  socket.on("autenticar_usuario", async ({ email, senha }) => {    
    const usuario = await encontrarUsuario({email});
    if (usuario) {
      const autenticado = autenticarUsuario(senha, usuario);

      if (autenticado) {
        const tokenJwt = gerarJwt({ usuario });
        //console.log(tokenJwt)
        socket.emit("autenticacao_sucesso", tokenJwt, usuario);
      } else {
        socket.emit("autenticacao_erro");
      }
    } else {
      socket.emit("usuario_nao_encontrado");
    }
  }); 
}

export default registrarEventosLogin;
