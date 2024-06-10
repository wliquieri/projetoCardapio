const socket = io();

function atualizarUrl(e) {
  let urlCategoria = document.getElementById("menu-categoria").getAttribute("href");
  urlCategoria += `?id=${e}`;
  document.getElementById("menu-categoria").setAttribute("href", urlCategoria)

  let urlProdutos = document.getElementById("menu-produtos").getAttribute("href");
  urlProdutos += `?id=${e}`;
  document.getElementById("menu-produtos").setAttribute("href", urlProdutos)

  let urlCardapio = document.getElementById("menu-cardapio").getAttribute("href");
  urlCardapio += `?id=${e}`;
  document.getElementById("menu-cardapio").setAttribute("href", urlCardapio)

  let urlCadastro = document.getElementById("menu-cadastro").getAttribute("href");
  urlCadastro += `?id=${e}`;
  document.getElementById("menu-cadastro").setAttribute("href", urlCadastro)

}

function atualizarFront(usuario) {
  document.querySelector(".nomeEmpresa").textContent = sessionStorage.getItem("empresa")
  socket.emit("atualizar_front_cardapio", { usuario })
  socket.on("atualizar_front_cardapio_sucesso", (cardapio) => {
    let categoria = [];
    cardapio.forEach(e => {
      categoria.push({ 'nome': e.nomeCategoria, 'categoria': e.categoria })
    })

    categoria = [...new Set(categoria.map(JSON.stringify))].map(JSON.parse)

    categoria.sort()

    categoria.forEach(categoria => {
      document.querySelector(".accordion").innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-${categoria.categoria}" aria-expanded="true" aria-controls="panelsStayOpen-${categoria.categoria}">
            ${categoria.nome}
          </button>
        </h2>
        <div id="panelsStayOpen-${categoria.categoria}" class="accordion-collapse collapse show">
        <div class="accordion-body overflow-x-auto table-responsive-sm">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">descrição</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody id="table-produtos-${categoria.categoria}">
        `
      /*       cardapio.forEach(cardapioFor => { 
              if (cardapioFor.nomeCategoria == categoria) {
                document.querySelector(".accordion").innerHTML += `
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-${cardapioFor.categoria}" aria-expanded="true" aria-controls="panelsStayOpen-${cardapioFor.categoria}">
                        ${cardapioFor.nomeCategoria}
                      </button>
                    </h2>
                    <div id="panelsStayOpen-${cardapioFor.categoria}" class="accordion-collapse collapse show">
                    <div class="accordion-body overflow-x-auto table-responsive-sm">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">descrição</th>
                          <th scope="col">Preço</th>
                        </tr>
                      </thead>
                      <tbody id="table-produtos-${cardapioFor.categoria}">
                `}
            })  */

      cardapio.forEach(e => {
        var elemento = `table-produtos-` + e.categoria
        if (e.categoria == categoria.categoria) {
          document.getElementById(elemento).innerHTML += `
                <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight-1" aria-controls="offcanvasRight" href="#">
                  <td>${e.nome}</td>
                  <td>${e.descricao}</td>
                  <td>${e.valor}</td>
                </tr>`
        }
      })
    })
  })
}

export { atualizarUrl, atualizarFront }