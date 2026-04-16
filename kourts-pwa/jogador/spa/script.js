let telaAnterior = "tela-home";
let telaAtual = "tela-home";
let nav = "nav";

function navegar(destino) {
  let telas = document.getElementsByClassName("tela");
  Array.from(telas).forEach((element) => {
    element.classList.remove("show");
    element.classList.add("collapse");
  });
  if (destino != "tela-home") {
    document.getElementById(nav).classList.remove("show");
    document.getElementById(nav).classList.add("collapse");
  } else {
    document.getElementById(nav).classList.add("show");
    document.getElementById(nav).classList.remove("collapse");
  }
  document.getElementById(destino).classList.remove("collapse");
  document.getElementById(destino).classList.add("show");
  telaAnterior = telaAtual;
  telaAtual = destino;
}

function voltar() {
  navegar(telaAnterior);
}

function mostrarDetalhes(
  nome,
  imagem,
  tipo,
  preco,
  descricao,
  nota,
  avaliacoes,
) {
  navegar("tela-detalhes-quadra");
  let detalhes = document.getElementById("detalhes-quadra");
  detalhes.innerHTML = `
            <div class="row g-3">
                <div class="col-md-4 text-center">
                <img src="${imagem}" class="img-fluid" alt="${tipo}">
                </div>
                <div class="col-md-8">
                <h2>${nome}</h2>
                <p><strong>Categoria:</strong> ${tipo}</p>
                <p><strong>Preço:</strong> R$ ${preco}</p>
                <p><strong>Descrição:</strong> ${descricao}</p>
                <p><strong>Avaliação:</strong> ${nota} ⭐ (${avaliacoes} avaliações)      <button id="btAgendar"> AGENDAR </button></p>
                </div>
            </div>
        `;
}
