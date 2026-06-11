function applyCNPJMask(input) {
 let value = input.value.replace(/\D/g, '').slice(0, 14);
 if (value.length === 0) {
  input.value = '';
  return;
 }
 let masked = '';
 if (value.length > 2) {
  masked = value.substring(0, 2) + '.';
  value = value.substring(2);
 } else {
  masked = value;
  input.value = masked;
  return;
 }
 if (value.length > 3) {
  masked += value.substring(0, 3) + '.';
  value = value.substring(3);
 } else {
  masked += value;
  input.value = masked;
  return;
 }
 if (value.length > 3) {
  masked += value.substring(0, 3) + '/';
  value = value.substring(3);
 } else {
  masked += value;
  input.value = masked;
  return;
 }
 if (value.length > 4) {
  masked += value.substring(0, 4) + '-';
  value = value.substring(4);
 } else {
  masked += value;
  input.value = masked;
  return;
 }
 masked += value;
 input.value = masked;
}

// Usage example:
const cnpjInput = document.getElementById('cnpj');
cnpjInput.addEventListener('focus', function () {
 this.value = this.value.replace(/\D/g, '').slice(0, 14);
});
cnpjInput.addEventListener('keydown', function (e) {
 setTimeout(() => applyCNPJMask(this), 0);
});

// -----------------------------------------------------------------------------------


const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('focus', () => {
 if (inputTelefone.value === '(__) _____-____') {
  inputTelefone.setSelectionRange(0, 0);
  console.log('Input telefone focado');
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

function mostrarDados() {
 const cnpj = document.getElementById('cnpj').value;
 const telefone = document.getElementById('telefone').value;
 const p = document.getElementById('resultado');
 const esporte = document.getElementById('esporte').value;

 p.textContent = `CNPJ: ${cnpj}, Telefone: ${telefone} e Esporte: ${esporte}`;

 console.log('CNPJ:', cnpj);
 console.log('Telefone:', telefone);
}