async function mostrarQuadras(id) {
 // Pega o elemento main
 let menu = document.querySelector('main');
 menu.innerHTML = ""
 try {
  let url = `http://localhost:8081/quadras/${id}`;
  const resultado = document.getElementById('resultado');
  const response = await axios.get(url);
  const quadra = response.data;
  
  menu.innerHTML = `
  <section>
   <h3\> ${quadra.nome} </h3>
   <img src="http://localhost:8081/fotos/${quadra.fotos[0]}" alt="foto da quadra" width="200" height="150">
  </section>
  `
 } catch (error) {
  console.error(error);
 }
}