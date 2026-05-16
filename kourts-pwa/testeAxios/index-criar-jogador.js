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
 nome: nome,
 email: email,
 senha: senha,
 telefone: telefone,
 apelido: apelido,
 cpf: cpf,
 sobrenome: sobrenome,
 local: {
  bairro: bairro,
  estado: estado,
  cidade: cidade
 }
};

axios.post(apiUrl, jogador)
 .then(response => {
  console.log('Jogador criado com sucesso:', response.data);
 })
 .catch(error => {
  console.error('Erro ao criar jogador:', error);
 });
}