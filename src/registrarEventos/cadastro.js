import { cadastrarUsuario, atualizarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("cadastrar_usuario", async (dados) => {

    const usuario = await encontrarUsuario({"email":dados.inputEmail});

    if (usuario === null) {
      const resultado = await cadastrarUsuario(dados);

      if (resultado.acknowledged) {
        socket.emit("cadastro_sucesso");
      } else {
        socket.emit("cadastro_erro");
      }
    } else {
      socket.emit("usuario_ja_existente");
    }
  });

  socket.on("atualizar_usuario", async (dados) => {

    let a = { "email": dados.inputEmail }

    const usuario = await encontrarUsuario(a);

    if (usuario) {
      const resultado = await atualizarUsuario(dados);
      if (resultado.acknowledged) {
        socket.emit("atualizar_sucesso", dados);
      } else {
        socket.emit("atualizar_erro");
      }
    } else {
      socket.emit("usuario_ja_existente");
    }
  });

  socket.on("dados_usuario", (dado) => {
    console.log(dado)
  })

}

export default registrarEventosCadastro;
