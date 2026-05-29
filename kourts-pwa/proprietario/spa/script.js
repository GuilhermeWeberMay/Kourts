/* Navegar entre as telas */
function navegar(destino, botaoClicado) {
  //Conteudo some
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('visivel'));

  //Mostra a tela de "destino"
  const alvo = document.getElementById(destino);
  if (alvo) alvo.classList.add('visivel');

  //Atualiza destaque na aba
  if (botaoClicado) {
    document.querySelectorAll('.spa-tab').forEach(b => b.classList.remove('ativo'));
    botaoClicado.classList.add('ativo');
  }
}

/* Input de pesquisa das reservas*/
function filtrarReservas(texto) {
  const termo = texto.toLowerCase();
  document.querySelectorAll('#lista-reservas .reserva-row').forEach(item => {
    item.style.display = item.dataset.busca.includes(termo) ? 'flex' : 'none';
  });
}