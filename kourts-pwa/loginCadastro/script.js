var tokenApelido; 
 
const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('focus', () => {
  if (inputTelefone.value === '(__) _____-____') {
    inputTelefone.setSelectionRange(0, 0);
  }
});

inputTelefone.addEventListener('keydown', (e) => {
  e.preventDefault();

  let numeros = inputTelefone.value.replace(/\D/g, '').replace(/_/g, '');

  if (e.key === 'Backspace') {
    numeros = numeros.slice(0, -1);
  }

  if (/^\d$/.test(e.key) && numeros.length < 11) {
    numeros += e.key;
  }

  let mascara = '(__) _____-____'.split('');
  const posicoes = [1, 2, 5, 6, 7, 8, 9, 11, 12, 13, 14];

  numeros.split('').forEach((num, index) => {
    if (posicoes[index] !== undefined) {
      mascara[posicoes[index]] = num;
    }
  });

  inputTelefone.value = mascara.join('');

  const proximo = inputTelefone.value.indexOf('_');
  if (proximo !== -1) {
    inputTelefone.setSelectionRange(proximo, proximo);
  }
});

// Validação de CPF com máscara personalizada
const input = document.getElementById('cpf');

input.addEventListener('focus', () => {
 if (input.value === '___.___.___-__') {
  input.setSelectionRange(0, 0);
 }
});

input.addEventListener('keydown', (e) => {
 e.preventDefault();

 // Mantém apenas números já digitados
 let numeros = input.value.replace(/\D/g, '').replace(/_/g, '');

 // Backspace
 if (e.key === 'Backspace') {
  numeros = numeros.slice(0, -1);
 }

 // Adiciona novo número
 if (/^\d$/.test(e.key) && numeros.length < 11) {
  numeros += e.key;
 }

 // Máscara base
 let mascara = '___.___.___-__'.split('');

 // Posições dos números no CPF
 const posicoes = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13];

 numeros.split('').forEach((num, index) => {
  mascara[posicoes[index]] = num;
 });

 input.value = mascara.join('');

 // Move cursor para próximo "_"
 const proximo = input.value.indexOf('_');

 if (proximo !== -1) {
  input.setSelectionRange(proximo, proximo);
 }
});

// Validação para o CEP
const inputCep = document.getElementById('cep');

inputCep.addEventListener('focus', () => {
 if (inputCep.value === '_____-___') {
  inputCep.setSelectionRange(0, 0);
 }
});

inputCep.addEventListener('keydown', (e) => {
 e.preventDefault();

 // Mantém apenas números já digitados
 let numeros = inputCep.value.replace(/\D/g, '').replace(/_/g, '');

 // Backspace
 if (e.key === 'Backspace') {
  numeros = numeros.slice(0, -1);
 }

 // Adiciona novo número
 if (/^\d$/.test(e.key) && numeros.length < 8) {
  numeros += e.key;
 }

 // Máscara base
 let mascara = '_____-___'.split('');

 // Posições dos números no CEP
 const posicoes = [0, 1, 2, 3, 4, 6, 7, 8];

 numeros.split('').forEach((num, index) => {
  mascara[posicoes[index]] = num;
 });

 inputCep.value = mascara.join('');

 // Move cursor para próximo "_"
 const proximo = inputCep.value.indexOf('_');

 if (proximo !== -1) {
  inputCep.setSelectionRange(proximo, proximo);
 }
});





  document.addEventListener('DOMContentLoaded', () => {
   mudaBt('login');
  });

  //troca de aba
  function mudaBt(tela){
    const formularios = document.getElementsByClassName('formulario');
    Array.from(formularios).forEach(f => f.classList.remove('show'));

    const btnLogin    = document.getElementById('btn-login');
    const btnCadastro = document.getElementById('btn-cadastro');
    const card        = document.querySelector('.card');

    if(tela === 'login')
    {
     document.getElementById('formulario-login').classList.add('show');
     btnLogin.classList.add('ativo');
     btnCadastro.classList.remove('ativo');
     card.style.maxWidth = '460px';
    }
    else {
      document.getElementById('formulario-cadastro').classList.add('show');
      btnCadastro.classList.add('ativo');
      btnLogin.classList.remove('ativo');
      card.style.maxWidth = '600px';
    }

  }


function criarJogador() {

const apiUrl = 'http://localhost:8081/auth/registrar';
const nome = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const senha = document.getElementById('senha').value;
const telefone = document.getElementById('telefone').value;
const apelido = document.getElementById('apelido').value;
const cpf = document.getElementById('cpf').value;
const sobrenome = document.getElementById('sobrenome').value;
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
        "estado": estado,
        "cidade": cidade
    }
};

axios.post(apiUrl, jogador)
 .then(response => {
  console.log('Jogador criado com sucesso:', response.data);
  const mensagemElement = document.getElementById('error');
  mensagemElement.textContent = `Jogador criado com sucesso!`;
  const retornoApi = response.data;

  tokenApelido = retornoApi;


  console.log(tokenApelido);
 })
 .catch(error => { // Favor não tocar nos nomes das variáveis abaixo, pois eles funcionam e não sei como
 const { data } = error.response;// Sintaxe de destructuring que transforma o objeto error.response.data em uma variável chamada data 

 // Se precisarem coloquem os erros que vocês precisarem. De acordo com o Json que vocês receberem
  console.log(error.response.data);
  
  data.error = "Erro ao criar jogador. Verifique os dados e tente novamente.";
  
  const mensagemElement = document.getElementById('error');
    mensagemElement.textContent = ` ${error.response.data}`;
    
})
};

function mostrarToken(){
  
    console.log(tokenApelido);
}

function login(){

    const apiUrl = 'http://localhost:8081/auth/login';
    const apelido = document.getElementById('login-apelido').value;
    const senha = document.getElementById('login-senha').value;

    const login = {
      "apelido" : apelido,
      "senha" : senha
    }


  axios.post(apiUrl, login)
  .then(response => {
  console.log('Login efetuado com sucesso:', response.data);
  const retornoApi = response.data;
  tokenApelido = retornoApi;

  console.log(tokenApelido);

  
 })
 .catch(error => { // Favor não tocar nos nomes das variáveis abaixo, pois eles funcionam e não sei como
 const { data } = error.response;// Sintaxe de destructuring que transforma o objeto error.response.data em uma variável chamada data 

 // Se precisarem coloquem os erros que vocês precisarem. De acordo com o Json que vocês receberem
  console.log(error.response.data);
  
  data.error = "Erro ao efetuar login. Verifique os dados e tente novamente.";
  
  const mensagemElement = document.getElementById('error');
    mensagemElement.textContent = ` ${error.response.data}`;
    
})
};




