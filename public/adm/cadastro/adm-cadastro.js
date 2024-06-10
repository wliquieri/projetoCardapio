const socket = io();

import {emitirAtualizarUsuario, atualizarFront, atualizarUrl, buscaCep} from "./socket-front-adm-cadastro.js"

const userId = new URL(window.location).searchParams.get("id");

if(userId===null){
window.location.replace('../../login/');
}else{
    atualizarFront(userId)
    atualizarUrl(userId)
}

const link = document.getElementById("menu-produtos");
const formCadastro = document.getElementById("form-cadastro");
const formAtualizarCadastro = document.getElementById("form-atualizar-cadastro")

formCadastro["inputCnpj"].value = sessionStorage.getItem("cnpj");
formCadastro["inputNomeEmpresa"].value = sessionStorage.getItem("empresa");
formCadastro["inputCep"].value = sessionStorage.getItem("cep");
formCadastro["inputComplemento"].value = sessionStorage.getItem("complemento");
formCadastro["inputEmail"].value = sessionStorage.getItem("email");

formAtualizarCadastro["atualizar-inputCnpj"].value = sessionStorage.getItem("cnpj");
formAtualizarCadastro["atualizar-inputNomeEmpresa"].value = sessionStorage.getItem("empresa");
formAtualizarCadastro["atualizar-inputCep"].value = sessionStorage.getItem("cep");
formAtualizarCadastro["atualizar-inputComplemento"].value = sessionStorage.getItem("complemento");
//formAtualizarCadastro["atualizar-inputEmail"].value = sessionStorage.getItem("email");


formAtualizarCadastro["atualizar-inputCep"].addEventListener("blur",() =>{
    const cep = formAtualizarCadastro["atualizar-inputCep"].value;
    let endPoint = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(endPoint)
        .then(response => {return response.json()})
        .then(data =>{
            if(data.erro){
                console.log(`Erro ao tentar localizar o CEP`);
                return;
            }else{
                console.log(data);
                formAtualizarCadastro['atualizar-inputUf'].value = data.uf;
                formAtualizarCadastro['atualizar-inputMunicipio'].value = data.localidade;
                formAtualizarCadastro['atualizar-inputBairro'].value = data.bairro;
                formAtualizarCadastro['atualizar-inputEndereco'].value = data.logradouro;
            }

        })
    
/*     if(cep.length === 8){
        buscaCep(cep);
    } */
})

{
    const endPoint = `https://viacep.com.br/ws/${formCadastro["inputCep"].value}/json/`
    fetch(endPoint)
        .then(response => {return response.json()})
        .then(data =>{
            if(data.error){
                console.log(`Erro ao tentar localizar o CEP`);
                return;
            }else{
                formCadastro["inputUf"].value = data.uf;
                formCadastro["inputMunicipio"].value = data.localidade;
                formCadastro["inputBairro"].value = data.bairro;
                formCadastro["inputEndereco"].value = data.logradouro;

                formAtualizarCadastro["atualizar-inputUf"].value = data.uf;
                formAtualizarCadastro["atualizar-inputMunicipio"].value = data.localidade;
                formAtualizarCadastro["atualizar-inputBairro"].value = data.bairro;
                formAtualizarCadastro["atualizar-inputEndereco"].value = data.logradouro;
            }
        })
}

formAtualizarCadastro.addEventListener("submit",(evento) =>{
    evento.preventDefault();

    const inputCnpj         = formAtualizarCadastro["atualizar-inputCnpj"].value;
    const inputNomeEmpresa  = formAtualizarCadastro["atualizar-inputNomeEmpresa"].value;
    const inputCep          = formAtualizarCadastro["atualizar-inputCep"].value;
    const inputComplemento  = formAtualizarCadastro["atualizar-inputComplemento"].value;
    const inputEmail        = formCadastro["inputEmail"].value;
    const inputId           = sessionStorage.getItem("id");

    emitirAtualizarUsuario({
        inputCnpj, 
        inputNomeEmpresa,
        inputCep,
        inputComplemento,
        inputEmail,
        inputId
    });
});
