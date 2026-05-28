function criarJogador() {

const apiUrl = 'http://localhost:8081/jogadores';
const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const senha = document.getElementById('senha').value;
const telefone = document.getElementById('telefone').value;
const apelido = document.getElementById('apelido').value;
const cpf = document.getElementById('cpf').value;
const sobrenome = document.getElementById('sobrenome').value;
const bairro = document.getElementById('bairro').value;
const estado = document.getElementById('estado').value;
const cidade = document.getElementById('cidade').value;

const jogador = {
    "nome": nome,
    "email": email,
    "senha": senha,
    "telefone": telefone,
    "apelido": apelido,
    "cpf": cpf,
    "sobrenome": sobrenome,
    "local": {
        "bairro": bairro,
        "estado": estado,
        "cidade": cidade
    }
};

axios.post(apiUrl, jogador)
 .then(response => {
  console.log('Jogador criado com sucesso:', response.data);
  const mensagemElement = document.getElementById('mensagem');
  mensagemElement.textContent = `Jogador criado com sucesso! ${response.data}`;

 })
 .catch(error => { // Favor não tocar nos nomes das variáveis abaixo, pois eles funcionam e não sei como
 const { data } = error.response;// Sintaxe de destructuring que transforma o objeto error.response.data em uma variável chamada data 

 // Se precisarem coloquem os erros que vocês precisarem. De acordo com o Json que vocês receberem
  console.log(data.status);    
  console.log(data.error);
  console.log(data.message); 
  
  data.error = "Erro ao criar jogador. Verifique os dados e tente novamente.";
  
  const mensagemElement = document.getElementById('mensagem');
  mensagemElement.textContent = `Erro ${data.status}: ${data.message}`;

})
 };