import "dotenv/config";

import io from "./servidor.js"  
import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosCategoria from "./registrarEventos/categoria.js";
import registrarEventosProduto from "./registrarEventos/produto.js";
import registrarEventosCardapio from "./registrarEventos/cardapio.js";
import registrarEventoLogin from "./registrarEventos/login.js";


io.of("/").on("connection", (socket) => {

    registrarEventosCadastro(socket, io);
    registrarEventosCategoria(socket, io);
    registrarEventosProduto(socket, io);
    registrarEventosCardapio(socket, io);
    registrarEventoLogin(socket, io);
}) 