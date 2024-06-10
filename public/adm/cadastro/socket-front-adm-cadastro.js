const socket = io();

function emitirAtualizarUsuario(dados) {    
    socket.emit("atualizar_usuario", dados);

    socket.on("atualizar_sucesso", (e) => {
    alert("Cadastro atualizado com sucesso!")
    sessionStorage.setItem("id", e.inputId);
    sessionStorage.setItem("email", e.inputEmail);
    sessionStorage.setItem("cnpj", e.inputCnpj);
    sessionStorage.setItem("empresa", e.inputNomeEmpresa);
    sessionStorage.setItem("cep", e.inputCep);
    sessionStorage.setItem("complemento", e.inputComplemento);
    window.location.replace(`../cadastro/?id=${e.inputId}`);
  });
  
  socket.on("atualizar_erro", () => alert("Erro no cadastro."));
  socket.on("usuario_ja_existente", () => alert("Usuário já existe!"));

}  

function buscaCep(e){  
  const endPoint = `https://viacep.com.br/ws/${e}/json/`
  fetch(endPoint)
      .then(response => {return response.json()})
      .then(data =>{
          if(data.error){
              console.log(`Erro ao tentar localizar o CEP`);
              return;
          }else{
            let cep = {
              "cep"         : e,
              "uf"          : data.uf,
              "localidade"  : data.localidade,
              "bairro"      : data.bairro,
              "logradouro"  : data.logradouro
            }
            return(cep)
          }
      })
}

function atualizarFront(e){
  document.querySelector(".nomeEmpresa").textContent = sessionStorage.getItem("empresa")
}


function atualizarUrl(e){
	let urlCategoria = document.getElementById("menu-categoria").getAttribute("href");
	    urlCategoria += `?id=${e}`;
        document.getElementById("menu-categoria").setAttribute("href",urlCategoria)

	let urlProdutos = document.getElementById("menu-produtos").getAttribute("href");
        urlProdutos  += `?id=${e}`;
        document.getElementById("menu-produtos").setAttribute("href",urlProdutos)
        
    let urlCardapio = document.getElementById("menu-cardapio").getAttribute("href");
        urlCardapio  += `?id=${e}`;
        document.getElementById("menu-cardapio").setAttribute("href",urlCardapio)

	let urlCadastro = document.getElementById("menu-cadastro").getAttribute("href");
        urlCadastro += `?id=${e}`;
	    document.getElementById("menu-cadastro").setAttribute("href",urlCadastro)
}


function recuperarUsuario(usuario){
  socket.emit("dados_usuario",usuario);

}

export { emitirAtualizarUsuario, recuperarUsuario, atualizarFront, atualizarUrl, buscaCep};

