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

function atualizarFront(e){
        document.querySelector(".nomeEmpresa").textContent = sessionStorage.getItem("empresa")
        //console.log(sessionStorage.getItem("empresa"))
      }

function cadastrarCategoria(nome, usuario) {
        socket.emit("cadastrar_categoria", { nome, usuario });

        socket.on("cadastro_categoria_sucesso", (e) => {
                alert("Cadastro atualizado com sucesso!")
                window.location.reload();
        })
        socket.on("categoria_ja_existente", ({nome})=>{
                alert(`Categoria ${nome} já existente`)
                window.location.reload();
        })

        console.log(categoria, userId)
}

function listarCategorias(usuario) {
        socket.emit("listar_categorias", { usuario });
}

function editarCategoria({ _id, nome, ativo }) {
        socket.emit("editar_categoria", { _id, nome, ativo });

        socket.on("editar_categoria_sucesso", (e) => {
                alert("Categoria editada com sucesso!")
                window.location.reload();
        });
        //socket.on("editar_categoria_erro", alert("Erro ao editar categoria, tente novamente mais tarde."))
}

socket.on("listar_categorias_sucesso", async (e) => {
        var a = e
        a.forEach(element => {
                let ativo = element.ativo
                if (ativo == true) {
                        ativo = `
                        <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked disabled>
                                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                </div>`
                } else {
                        ativo = `
                        <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled>
                                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                </div>`
                }
                document.getElementById("table-categoria").innerHTML += `
                        <tr class='linhaCategoria' id='${element._id}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight-1" aria-controls="offcanvasRight" href="#"  >
                        <td class='idCategoria' scope="row" hidden >${element._id}</td>
                        <td >${element.nome}</td>
                        <td>${ativo}</div></td>
                </tr>`
        });
        var categoria = document.querySelectorAll(".linhaCategoria")

        categoria.forEach(element => {
                element.addEventListener("click", (element) => {
                        document.getElementById("input-editar-categoria-nome").value = element.currentTarget.children[1].innerHTML
                        document.getElementById("input-editar-categoria-id").value = element.currentTarget.id
                        if (element.currentTarget.children[2].children[0].children[0].checked == true) {
                                document.getElementById("input-editar-categoria-ativo").checked = true
                        } else {
                                document.getElementById("input-editar-categoria-ativo").checked = false
                        }
                })
        });
})

export { atualizarUrl, atualizarFront, cadastrarCategoria, listarCategorias, editarCategoria }