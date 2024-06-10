import { categorias } from "./dbConnect.js";
import { ObjectId } from 'mongodb';

function cadastrarCategoria(categoria) {
  return categorias.insertOne(categoria);
}

function encontrarCategoria(categoria) {
  return categorias.findOne(categoria)
}

function encontrarCategoriaId({ _id }) {
  const objectId = new ObjectId(`${_id}`);
  return categorias.findOne({ _id: objectId });
}

function atualizarCategoria({ _id, nome, ativo }) {
  return categorias.updateOne(
    { _id: new ObjectId(`${_id}`) },
    {
      $set: {
        nome: nome,
        ativo: ativo
      }
    }
  )
}

function deletarCategoria(categoria) {
  return categorias.deleteOne(categoria)
}

function listarCategorias({ usuario }) {
  return categorias.find({ usuario }).sort({ "nome": 1 }).toArray(); //Ordenado por nome
}

function contarCategorias({ usuario }) {
  return categorias.count({ usuario });
}

export { cadastrarCategoria, contarCategorias, listarCategorias, encontrarCategoria, encontrarCategoriaId, atualizarCategoria, deletarCategoria };