const socket = io();
var categoria = {}
const formCadastrarProduto = document.getElementById("form-cadastro-protudo");
const formEditarProduto = document.getElementById("form-editar-produto");

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

function listarProdutos(usuario) {
        socket.emit("listar_produtos", { usuario });
}

socket.on("listar_produtos_sucesso", async (e) => {

        var a = e
        a.forEach(element => {

                let ativo = element.ativo
                if (ativo == true) {
                        ativo = `
                        <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="ativo_${element._id}" checked disabled>
                                <label class="form-check-label" for="ativo_${element._id}"></label>
                                </div>`
                } else {
                        ativo = `
                        <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="ativo_${element._id}" disabled>
                                <label class="form-check-label" for="ativo_${element._id}"></label>
                                </div>`
                }
                document.getElementById("table-produtos").innerHTML += `
                        <tr class='linhaCategoria' id='${element._id}' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight-1" aria-controls="offcanvasRight" href="#" >
                        <td class='idCategoria' scope="row" hidden >${element._id}</td>
                        <td class='idCategoria' scope="row" >${element.nome}</td>
                        <td >${element.descricao}</td>
                        <td >${element.valor}</div></td>
                        <td hidden>${element.categoria}</td>
                        <td>${ativo}</div></td>
                </tr>`
        }
        );
        var categoria = document.querySelectorAll(".linhaCategoria")

        categoria.forEach(element => {
                element.addEventListener("click", (element) => {
                        document.getElementById("input-editar-produto-id").value = element.currentTarget.children[0].innerHTML
                        document.getElementById("input-editar-produto-nome").value = element.currentTarget.children[1].innerHTML
                        document.getElementById("input-editar-produto-descricao").value = element.currentTarget.children[2].innerHTML
                        document.getElementById("input-editar-produto-valor").value = element.currentTarget.children[3].innerHTML
                        document.getElementById("input-editar-produto-categoria").value = element.currentTarget.children[4].innerHTML
                        if (element.currentTarget.children[5].children[0].children[0].checked == true) {
                                document.getElementById("input-editar-produto-ativo").checked = true
                        } else {
                                document.getElementById("input-editar-produto-ativo").checked = false
                        }
                })
        });
})

function atualizarFront(e) {
        document.querySelector(".nomeEmpresa").textContent = sessionStorage.getItem("empresa")
        //console.log(sessionStorage.getItem("empresa"))
}

function cadastrarProduto({ usuario, categoria, nome, descricao, valor }) {

        socket.emit("cadastrar_produto", { usuario, categoria, nome, descricao, valor, ativo: true });

        socket.on("cadastro_produto_sucesso", (e) => {
                alert("cadastrado com sucesso");
                window.location.reload();
        })
        socket.on("produto_ja_existente", ({ categoria, nome }) => {
                alert(`${nome} ja consta em seu cadastrado`);
                window.location.reload();
        })
}

function editarProduto({ _id, nome, categoria, descricao, valor, ativo }) {

        socket.emit("editar_produto", { _id, nome, categoria, descricao, valor, ativo });

        socket.on("editar_produto_sucesso", (e) => {
                alert("editado com sucesso");
                window.location.reload();
        });
}

function listarCategorias(usuario) {
        socket.emit("listar_categorias", { usuario });
        socket.on("listar_categorias_sucesso", async (e) => {
                for (let index = 0; index < e.length; index++) {    
                        formCadastrarProduto["input-cadastro-produto-categoria"].innerHTML += `<option value="${e[index]._id}">${e[index].nome}</option>`
                        formEditarProduto["input-editar-produto-categoria"].innerHTML += `<option value="${e[index]._id}">${e[index].nome}</option>`
                }
        })
}

/* for (let index = 0; index < categoria.length; index++) {
        alert("opa")
        console.log("opa",categoria[index]._id)
        formCadastrarProduto["input-cadastro-produto-categoria"].innerHTML  += `<option value="${categoria._id}">${categoria.nome}</option>`
        //formEditarProduto["input-editar-produto-categoria"].innerHTML  += `<option value="${element._id}">${element.nome}</option>`
} */

export { atualizarUrl, atualizarFront, listarProdutos, cadastrarProduto, editarProduto, listarCategorias }