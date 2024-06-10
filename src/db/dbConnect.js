import { MongoClient } from "mongodb";

let acessoBanco = {
    usuario:"wliquieri",
    senha:"1234"
}

const cliente = new MongoClient(`mongodb+srv://${acessoBanco.usuario}:${acessoBanco.senha}@aluracluster.jqjjqwa.mongodb.net/?retryWrites=true&w=majority&appName=AluraCluster`);

let fornecedores, usuarios, categorias, produtos;

try{
    await cliente.connect();
    const db = cliente.db("cardapio");
    usuarios    = db.collection("usuario")
    categorias  = db.collection("categorias")
    produtos  = db.collection("produtos")
    /* fornecedores = db.collection("fornecedor") */

    console.log(`Conectado ao Banco de dados`);

}catch (e){
    console.log(e);
}

export {usuarios, categorias, produtos}