const socket = io();
import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");
const inputCep = document.getElementById("inputCep");


//Busca CEP e preenche os dados na tela;
inputCep.addEventListener("blur", (e)=>{
  const cep = form["inputCep"].value;
  
  const endPoint = `https://viacep.com.br/ws/${cep}/json/`
    
  fetch(endPoint)
  .then(response =>{return response.json()})
  .then(data => {
    if(data.erro){
      console.log(`O cep Digitado está errado`);
      return;
    }else{
      // inputUf.value = data.uf;
      form["inputUf"].value = data.uf;
      form["inputMunicipio"].value = data.localidade;
      form["inputBairro"].value = data.bairro;
      form["inputEndereco"].value = data.logradouro;
      
    }
  })
})


form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const inputCnpj         = form["inputCnpj"].value;
  const inputNomeEmpresa  = form["inputNomeEmpresa"].value;
  const inputCep          = form["inputCep"].value;
  const inputComplemento  = form["inputComplemento"].value;
  const inputEmail        = form["inputEmail"].value;
  const inputPassword     = form["inputPassword"].value;


  emitirCadastrarUsuario({ 
    inputCnpj, 
    inputNomeEmpresa,
    inputCep,
    inputComplemento,
    inputEmail,
    inputPassword
   });
});
