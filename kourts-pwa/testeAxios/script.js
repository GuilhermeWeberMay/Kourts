async function mostrarQuadras() {
 try {
  let url = "http://localhost:8081/quadras";
  const response = await axios.get(url);
  const quadras = response.data;

  const divList = document.getElementById("div");

  divList.innerHTML = ``;
  quadras.map((e) => {
    let horariosHTML = '';
      for (const [data, horarios] of Object.entries(e.horariosDisponiveis || {})) {
        horariosHTML += `<strong>${data}:</strong> ${horarios.join(', ')}<br>`;
      }
   const divQuadra = document.createElement("div");
   divQuadra.innerHTML = ` ${e.nome}
                        ${e.esporte}
                      R$${e.precoPorHora}
                        ${e.qtdJogadores}
                        ${e.horaAbertura}
                        ${horariosHTML}
                        ${e.cep}<br>`;
                        e.fotos.forEach(fotos => {
                         const img = document.createElement("img");
                         img.src = "http://localhost:8081/fotos/"+fotos
                         divQuadra.appendChild(img)
                        });

   return divList.appendChild(divQuadra);
  
  });
  console.log(quadras);
 } catch (Error) {
  console.log(Error);
 }
}
