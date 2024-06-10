import { usuarios } from "./dbConnect.js";
import criaHashESalSenha from "../utils/criaHashESalSenha.js";


function cadastrarUsuario(dado){
    //console.log(dado)
    var a  = criaHashESalSenha(dado.inputPassword);
    a.email = dado.inputEmail;
    a.cnpj = dado.inputCnpj;
    a.nomeEmpresa = dado.inputNomeEmpresa
    a.cep = dado.inputCep;
    a.complemento = dado.inputComplemento;
    
    return usuarios.insertOne(a);
}

/* function atualizarUsuario(dado){
    console.log(dado)
    //var a  = criaHashESalSenha(dado.inputPassword);
    //a.email = dado.inputEmail;
    a.cnpj = dado.inputCnpj;
    a.nomeEmpresa = dado.inputNomeEmpresa
    a.cep = dado.inputCep;
    a.complemento = dado.inputComplemento;
    
    return usuarios.update(a);
} */

function atualizarUsuario(dado) {
   

     const atualizacao = usuarios.updateOne(
        { email: dado.inputEmail}, 
        { $set: { 
            cnpj: dado.inputCnpj, 
            nomeEmpresa: dado.inputNomeEmpresa, 
            cep: dado.inputCep, 
            complemento: dado.inputComplemento } }
    );
    return atualizacao;
  }


function encontrarUsuario({email}){
    return usuarios.findOne({email})
}

export {cadastrarUsuario, atualizarUsuario, encontrarUsuario};