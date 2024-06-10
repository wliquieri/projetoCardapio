const socket = io();

import { atualizarUrl, atualizarFront, cadastrarCategoria, listarCategorias, editarCategoria } from "./socket-front-categoria.js";

const userId = new URL(window.location).searchParams.get("id");
const categorias = listarCategorias(userId);
const formCategoria = document.getElementById("form-cadastro-categoria");
const formEditarCategoria = document.getElementById("form-editar-categoria");

if (userId === null) {
	window.location.replace('../../login/');
}
else {
	atualizarUrl(userId)
	atualizarFront(userId)
}

formCategoria.addEventListener("submit", (e) => {
	e.preventDefault()

	if (!formCategoria["input-cadastro-categoria"].value) {
		alert("Preencha o nome da categoria")
	} else {
		cadastrarCategoria(formCategoria["input-cadastro-categoria"].value, userId)
	}

})

formEditarCategoria.addEventListener("submit", (e) => {
	e.preventDefault()
	if (!formEditarCategoria["input-editar-categoria-nome"].value) {
		alert("Preencha o nome da categoria")
	} else {
		let valores = {
			'_id': formEditarCategoria["input-editar-categoria-id"].value,
			'nome': formEditarCategoria["input-editar-categoria-nome"].value,
			'ativo': formEditarCategoria["input-editar-categoria-ativo"].checked
		}
		editarCategoria(valores)
	}


})




