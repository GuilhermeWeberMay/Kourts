async function mostrarQuadras() {
  try {
    let url = "http://localhost:8081/quadras";
    const response = await axios.get(url);
    const quadras = response.data;

    const divList = document.getElementById("div");

    divList.innerHTML = ``;
    quadras.map((e) => {
      const divQuadra = document.createElement("div");
      divQuadra.innerHTML = ` ${e.id}
                        ${e.esporte}
                      R$${e.precoPorHora}
                        ${e.qtdJogadores}
                        ${e.horaAbertura}
                        ${e.horariosDisponiveis}`;

      return divList.appendChild(divQuadra);
    });
    console.log(quadras);
  } catch (Error) {
    console.log(Error);
  }
}
