import {listarProdutos} from "../db/cardapioDb.js"
import { listarCategorias } from "../db/categoriasDb.js";

function registrarEventosCardapio(socket, io) {
    socket.on("atualizar_front_cardapio", async ({usuario}) => {

       const listaProtudos = await listarProdutos({usuario})
       const listaCategoria = await listarCategorias({usuario})
       
       listaProtudos.forEach(produto => {
        listaCategoria.forEach(categoria =>{
            if(produto.categoria == categoria._id){
                produto.nomeCategoria = categoria.nome
            }
        })
       });

       socket.emit("atualizar_front_cardapio_sucesso", listaProtudos)
       
      // socket.emit("atualizar_front_cardapio", resultado)
    });
}

export default registrarEventosCardapio;