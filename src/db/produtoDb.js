import { produtos } from "./dbConnect.js";
import { ObjectId } from 'mongodb';

function cadastrarProduto({usuario, categoria, nome, descricao, valor, imagem, destaque, ativo}) {
  return produtos.insertOne({usuario, categoria, nome, descricao, valor, imagem, destaque, ativo });
}

function encontraProdutoId({_id}) {
  const objectId = new ObjectId(`${_id}`);
  return produtos.findOne({ _id: objectId });

} 

function encontraProduto({usuario, nome}) {
    return produtos.findOne({usuario, nome});
}

function atualizaProduto({_id, nome ,categoria , descricao, valor, ativo}) {
  return produtos.updateOne(
    { _id: new ObjectId(`${_id}`) }, 
    { 
      $set: { nome : nome,
              categoria : categoria,
              descricao : descricao,
              valor : valor,
              ativo : ativo
            } 
    });
}

function removeProduto(id) {
  produtos.deleteOne({ _id: ObjectId(id) });
}

function listarProdutos({usuario}) {
  return produtos.find({ usuario }).sort({ "nome": 1 }).toArray();
}

export { cadastrarProduto, encontraProdutoId, encontraProduto, atualizaProduto, removeProduto, listarProdutos };