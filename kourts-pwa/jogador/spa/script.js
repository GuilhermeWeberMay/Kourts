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

async function fetchAvailableTimes() {
  try {
    const response = await fetch(
      "http://localhost:8081/quadras/1/horarios-disponiveis?dias=30",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch times");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching times:", error);
    return [];
  }
}

async function carregarHorarios() {
  const times = await fetchAvailableTimes();
  displayTimes(times);
}

function displayTimes(times) {
  const container = document.getElementById("times-container");
  if (!container) {
    console.error("Container not found");
    return;
  }
  container.innerHTML = "<h3>Available Times:</h3>";
  times.forEach((time) => {
    const button = document.createElement("button");
    button.textContent = time; // Assuming time is a string like '2023-10-01 14:00'
    button.style.margin = "5px";
    button.onclick = () => bookTime(time);
    container.appendChild(button);
  });
}

async function bookTime(selectedTime) {
  const reservaData = {
    quadra_id: 1,
    horario: selectedTime,
    // Additional fields can be added here, e.g., user_id, duration, etc.
    // Example JSON sent: {"quadra_id":1,"horario":"2023-10-01 14:00"}
  };

  try {
    const response = await fetch("/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaData),
    });

    if (response.ok) {
      alert("Reservation created successfully!");
      // Optionally refresh times
      const times = await fetchAvailableTimes();
      displayTimes(times);
    } else {
      const errorData = await response.json();
      alert(
        `Error creating reservation: ${errorData.message || "Unknown error"}`,
      );
    }
  } catch (error) {
    console.error("Error booking time:", error);
    alert("Failed to create reservation");
  }
}
