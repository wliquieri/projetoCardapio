import { produtos } from "./dbConnect.js";
import { categorias } from "./dbConnect.js";
import { ObjectId } from 'mongodb';



function listarProdutos({usuario}) {
    return produtos.find({ usuario }).sort({ "nome": 1 }).toArray(); //Ordenado por nome
}
function listarCategorias({usuario}) {
    return categorias.find({ usuario }).sort({ "nome": 1 }).toArray(); //Ordenado por nome
}

export { listarProdutos, listarCategorias };