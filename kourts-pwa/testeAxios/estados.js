const url = "https://brasilapi.com.br/api/ibge/uf/v1"

async function getCities() {
 try {
  const response = await axios.get(url)
  const data = response.data
  const resultado = document.getElementById("estado")
  resultado.innerHTML = "";
  data.forEach(uf => {
   const p = document.createElement("option")
   p.textContent = `${uf.sigla}`
   resultado.appendChild(p)
  }
  )
 } catch (error) {
  console.error(error)
 }
}

// Carregar cidades quando o estado mudar
document.getElementById('estado').addEventListener('change', function () {
 const uf = this.value;
 if (!uf) return;
 const citySelect = document.getElementById('city');
 citySelect.innerHTML = '<option value="">Carregando...</option>';
 citySelect.disabled = true;

 fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
  .then(response => response.json())
  .then(cities => {
   citySelect.innerHTML = '<option value="">Selecione uma cidade</option>';
   cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.nome;
    option.textContent = city.nome;
    citySelect.appendChild(option);
   });
   citySelect.disabled = false;
  })
  .catch(error => {
   console.error('Erro ao carregar cidades:', error);
   citySelect.innerHTML = '<option value="">Erro ao carregar</option>';
   citySelect.disabled = false;
  });
});

function apresentarDados(){
 const estado = document.getElementById("estado").value
 const cidade = document.getElementById("city").value

 const resultado = document.getElementById("resposta")
 resultado.textContent = `Estado: ${estado}, Cidade: ${cidade}`
}