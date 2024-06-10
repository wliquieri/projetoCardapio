const socket = io();
import { atualizarUrl, atualizarFront } from "./socket-front-cardapio.js";

const userId = new URL(window.location).searchParams.get("id");
if (userId === null) {
	window.location.replace('../../login/');
}
else {
	atualizarUrl(userId)
	atualizarFront(userId)
    //atualizarPaginaCardapio(userId)
}