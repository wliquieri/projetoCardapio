import { definirCookie } from "../utils/cookie.js";

const socket = io();

function emitirAutenticarUsuario(dados) {
  socket.emit("autenticar_usuario", dados);


  socket.on("autenticacao_sucesso", (tokenJwt,usuario) => {
    definirCookie("tokenJwt", tokenJwt)
    sessionStorage.setItem("id", usuario._id);
    sessionStorage.setItem("email", usuario.email);
    sessionStorage.setItem("cnpj", usuario.cnpj);
    sessionStorage.setItem("empresa", usuario.nomeEmpresa);
    sessionStorage.setItem("cep", usuario.cep);
    sessionStorage.setItem("complemento", usuario.complemento);
    //alert("Usuário autenticado com sucesso!"); 
    //console.log(usuario)
    window.location.replace(`../adm/categorias/?id=${usuario._id}`);
  });

  socket.on("autenticacao_erro", () => alert("Erro na autenticação."));
  socket.on("usuario_nao_encontrado", () => alert("Usuário não encontrado."));
}
export { emitirAutenticarUsuario }; 