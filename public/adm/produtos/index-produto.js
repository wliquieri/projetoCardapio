import { atualizarUrl, atualizarFront, cadastrarProduto, listarProdutos, editarProduto, listarCategorias } from "./socket-front-produtos.js";

const socket = io();
const userId = new URL(window.location).searchParams.get("id");
const formCadastrarProduto = document.getElementById("form-cadastro-protudo");
const formEditarProduto = document.getElementById("form-editar-produto");

if (userId === null) {
    window.location.replace('../../login/');
} else {
    atualizarFront(userId)
    atualizarUrl(userId)
}

const produto = listarProdutos(userId);
const categorias = listarCategorias(userId)


formCadastrarProduto.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!formCadastrarProduto["input-cadastro-produto-nome"].value) {
        alert("Preencha o nome do produto")

    } else {
        let produto = {
            'usuario': userId,
            'categoria': formCadastrarProduto["input-cadastro-produto-categoria"].value,
            'nome': formCadastrarProduto["input-cadastro-produto-nome"].value,
            'descricao': formCadastrarProduto["input-cadastro-produto-descricao"].value,
            'valor': formCadastrarProduto["input-cadastro-produto-valor"].value
        }
        cadastrarProduto(produto);
    }


})

formEditarProduto.addEventListener("submit", (e) => {
    e.preventDefault()

    if(!formEditarProduto["input-editar-produto-nome"].value){
        alert("Preencha o nome do produto")
    }
    else{
    let valores = {
        '_id': formEditarProduto["input-editar-produto-id"].value,
        'nome': formEditarProduto["input-editar-produto-nome"].value,
        'categoria': formEditarProduto["input-editar-produto-categoria"].value,
        'descricao': formEditarProduto["input-editar-produto-descricao"].value,
        'valor': formEditarProduto["input-editar-produto-valor"].value,
        'ativo': formEditarProduto["input-editar-produto-ativo"].checked
    }
    editarProduto(valores)
    }

    
})
