
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
