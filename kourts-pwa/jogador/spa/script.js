let telaAnterior = "tela-home";
let telaAtual = "tela-home";
let nav = "nav";

function navegar(destino) {
  let telas = document.getElementsByClassName("tela");
  Array.from(telas).forEach((element) => {
    element.classList.remove("show");
    element.classList.add("collapse");
  });
  if (destino == "tela-contato" || destino == "tela-user") {
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
                  <p><strong>Avaliação:</strong> ${nota} ⭐ (${avaliacoes} avaliações)</p>

                  <button class="btn btn-sucess mt-3" onclick="carregarHorarios()">
                    Agendar Horários
                  </button
                  
                  <div id="times-container" class="mt-3"></div> 
                </div>
            </div>
        `;
}

async function mostrarQuadras() {
 try {
  let url = "http://localhost:8081/quadras";
  const response = await axios.get(url);
  const quadras = response.data;

  const divList = document.getElementById("tela-home");

  divList.innerHTML = ``;
  quadras.map((e) => {
   let horariosHTML = '';
   for (const [data, horarios] of Object.entries(e.horariosDisponiveis || {})) {
    horariosHTML += `<strong>${data}:</strong> ${horarios.join(', ')}<br>`;
   }
   const divQuadra = document.createElement("div");
   divQuadra.className = "card p-2 mb-3";

   let imagensHTML = "";
    e.fotos.forEach(fotos => {
    imagensHTML += `<img src= "http://localhost:8081/fotos/${fotos}"
                        class = "img-fluid mb-2 
                        style = "height:200px; object-fit:cover;">`;
    


   divQuadra.innerHTML = ` ${imagensHTML}
                          <h5>${e.nome} </h5>
                          <p>R$${e.precoPorHora} </p>
                        
                          `;                 
   });
   divQuadra.innerHTML+= "<br>"
   return divList.appendChild(divQuadra);

  });
  console.log(quadras);
 } catch (Error) {
  console.log(Error);
 }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarQuadras();
});


