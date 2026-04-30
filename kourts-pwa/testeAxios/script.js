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
   divQuadra.innerHTML = ` ${e.nome}<br>
                      R$${e.precoPorHora}
                        <br>`;
   e.fotos.forEach(fotos => {
    const img = document.createElement("img");
    img.src = "http://localhost:8081/fotos/" + fotos
    divQuadra.appendChild(img)
   });

   return divList.appendChild(divQuadra);

  });
  console.log(quadras);
 } catch (Error) {
  console.log(Error);
 }
}
