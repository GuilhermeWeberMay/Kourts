async function mostrarQuadras() {
 // Pega o elemento main
 let main = document.querySelector('main');
 try {
  let url = `http://localhost:8081/quadras`;

  const response = await axios.get(url);
  const quadras = response.data;
  
  main.innerHTML = "";
  quadras.forEach(quadra => {
   const div = document.createElement("section");
   div.innerHTML = `
  <div>
   <h3\> ${quadra.nome} </h3>
   <img src="http://localhost:8081/fotos/${quadra.fotos[0]}" alt="foto da quadra" width="200" height="150">
  </div>
  `
  main.appendChild(div);
  });
  
 } catch (error) {
  console.error(error);
 }
}