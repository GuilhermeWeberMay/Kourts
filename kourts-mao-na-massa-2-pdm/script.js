let telaAnterior = "tela-home";
let telaAtual = "tela-home";
let nav = "nav";

//armazena todas as quadras para nós utilizarmos na pesquisa
let todasAsQuadras = [];

function navegar(destino) {
  let telas = document.getElementsByClassName("tela");
  Array.from(telas).forEach((element) => {
    element.classList.remove("show");
    element.classList.add("collapse");
  });
  const searchWrapper = document.querySelector('.search-wrapper');
  if (destino === 'tela-user') {
    searchWrapper.style.display = 'none';
  } else {
    searchWrapper.style.display = '';
  }
  document.getElementById(destino).classList.remove("collapse");
  document.getElementById(destino).classList.add("show");
  telaAnterior = telaAtual;
  telaAtual = destino;

  if (destino === 'tela-reservas') {
    mostrarReservas();
  }
}

function voltar() {
  navegar(telaAnterior);
}

// Abre o modal de detalhes da quadra (sem horários)
function mostrarDetalhes(quadra) {
  const modal = document.getElementById("modal-detalhes");

  let imagensHTML = "";
  (quadra.fotos || []).forEach((foto, index) => {
    imagensHTML += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${foto}"
             class="d-block w-100"
             style="height:250px; object-fit:cover; border-radius:8px;">
      </div>`;
  });

  modal.innerHTML = `
    <div class="modal-overlay" onclick="fecharModal(event)">
      <div class="modal-box">

        <div id="carouselDetalhes" class="carousel slide mb-3" data-bs-ride="carousel">
          <div class="carousel-inner">${imagensHTML}</div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>

        <h4 class="fw-bold">${quadra.nome}</h4>
        <p class="fs-5">R$ ${quadra.precoPorHora}/hora</p>

        <ul class="list-unstyled">
          <li> <strong>Endereço:</strong> ${quadra.rua || "Não informado"}</li>
          <li> <strong>Bairro:</strong>     ${quadra.bairro || "Não informado"}</li>
          <li> <strong>Cidade:</strong>     ${quadra.cidade || "Não informado"}</li>
          <li> <strong>Jogadores:</strong> ${quadra.qtdJogadores || "Não informado"}</li>
          <li> <strong>Dimensões:</strong> ${quadra.largura || "?"}m x ${quadra.comprimento || "?"}m</li>
          <li> <strong>Esporte:</strong> ${quadra.esporte || "Não informado"}</li>
        </ul>

        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-secondary w-50" onclick="fecharModal()">Voltar</button>
          <button class="btn btn-success w-50 fw-bold" onclick="abrirAgendamento('${quadra.id}')">AGENDAR</button>
        </div>

      </div>
    </div>`;

  modal.classList.remove("collapse");
  modal.classList.add("show");
}

let horariosCache = {}; // guarda os horários já buscados

async function abrirAgendamento(quadraId) {
  const modal = document.getElementById("modal-agendamento");
  const semana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  // Busca os horários dos próximos 7 dias de uma vez
  try {
    const response = await axios.get(`http://localhost:3000/quadras/${quadraId}`);
    horariosCache = response.data; // { "2026-05-05": ["08:00:00", ...], ... }
  } catch (err) {
    console.log(err);
    alert("Erro ao buscar horários.");
    return;
  }

  let diasHTML = "";
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const num = d.getDate();
    const dow = semana[d.getDay()];
    // Formata a data igual à chave que vem da API: "2026-05-05"
    const dataKey = d.toISOString().split("T")[0];

    diasHTML += `
      <div class="dia-item" onclick="selecionarDia(this, '${dataKey}')">
        <div class="dia-bolinha" data-key="${dataKey}">${num}</div>
        <span class="dia-label">${dow}</span>
      </div>`;
  }

  modal.innerHTML = `
    <div class="modal-overlay" onclick="fecharAgendamento(event)">
      <div class="modal-box">
        <h5 class="fw-bold mb-3">Escolha o dia</h5>

        <div class="dias-container">
          ${diasHTML}
        </div>

        <div id="horarios-container" class="mt-3" style="display:none;">
          <p class="fw-bold mb-2" id="horarios-label"></p>
          <div id="slots-container" class="d-flex flex-wrap gap-2"></div>
        </div>

        <div class="d-flex gap-2 mt-4">
          <button class="btn btn-secondary w-50" onclick="fecharAgendamento()">Voltar</button>
          <button class="btn btn-success w-50 fw-bold" id="btn-confirmar" style="display:none;"
                  onclick="confirmarAgendamento('${quadraId}')">
            CONFIRMAR
          </button>
        </div>

      </div>
    </div>`;

  modal.classList.remove("collapse");
  modal.classList.add("show");
}

function selecionarDia(el, dataKey) {
  // Destaca a bolinha
  document.querySelectorAll(".dia-bolinha").forEach(b => b.classList.remove("ativo"));
  el.querySelector(".dia-bolinha").classList.add("ativo");

  const horariosContainer = document.getElementById("horarios-container");
  const horariosLabel = document.getElementById("horarios-label");
  const slotsContainer = document.getElementById("slots-container");
  const btnConfirmar = document.getElementById("btn-confirmar");

  // Pega os horários do cache (já vieram da API ao abrir o modal)
  const horarios = horariosCache.horariosDisponiveis[dataKey] || [];

  horariosLabel.textContent = `Horários disponíveis`;
  horariosContainer.style.display = "block";
  btnConfirmar.style.display = "none";

  if (horarios.length === 0) {
    slotsContainer.innerHTML = `<span class="text-muted">Nenhum horário disponível neste dia.</span>`;
    return;
  }

  // A API retorna "08:00:00" — exibe só "08:00"
  slotsContainer.innerHTML = horarios.map(h => {
    const horaFormatada = h.substring(0, 5);
    return `
      <button class="btn btn-outline-success slot-horario"
              onclick="selecionarHorario(this, '${dataKey}', '${horaFormatada}')">
        ${horaFormatada}
      </button>`;
  }).join("");
}


// ✅ Seleciona um horário
function selecionarHorario(el, data, hora) {
  document.querySelectorAll(".slot-horario").forEach(b => b.classList.remove("active", "btn-success"));
  el.classList.add("active", "btn-success");
  el.classList.remove("btn-outline-success");

  // Guarda no modal para usar no confirmar
  document.getElementById("modal-agendamento").dataset.dataSelecionada = data;
  document.getElementById("modal-agendamento").dataset.horaSelecionada = hora;
  document.getElementById("btn-confirmar").style.display = "block";
}

// ✅ Confirma o agendamento
async function confirmarAgendamento(quadraId) {
  const modal = document.getElementById("modal-agendamento");
  const data = modal.dataset.dataSelecionada;
  const hora = modal.dataset.horaSelecionada;

  try {
    await axios.post("http://localhost:3000/reservas", {
      quadraId,
      data,
      hora,
    });

    // Remove o horário reservado
    await removerHorario(quadraId, data, hora + ":00");

    alert(`Agendamento confirmado!\nData: ${data}\nHorário: ${hora}`);
    fecharAgendamento();
    fecharModal();
  } catch (err) {
    console.log(err);
    alert("Erro ao confirmar agendamento.");
  }
}

function fecharAgendamento(event) {
  if (event && event.target !== document.querySelector("#modal-agendamento .modal-overlay")) return;
  const modal = document.getElementById("modal-agendamento");
  modal.classList.remove("show");
  modal.classList.add("collapse");
}

function fecharModal(event) {
  if (event && event.target !== document.querySelector("#modal-detalhes .modal-overlay")) return;
  const modal = document.getElementById("modal-detalhes");
  modal.classList.remove("show");
  modal.classList.add("collapse");
}

async function mostrarQuadras() {
  try {
    let url = "http://localhost:3000/quadras";
    const response = await axios.get(url);
    todasAsQuadras = response.data
    renderizarQuadras(todasAsQuadras);
    console.log(todasAsQuadras);
  }
  catch (Error) {
    console.log(Error);
  }
}

function renderizarQuadras(quadras) {
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
      imagensHTML += `<img src= "${fotos}"
                        class = "img-fluid mb-2 
                        style = "height:200px; object-fit:cover;">`;



      divQuadra.innerHTML = `<img src= "${fotos}" class = "img-fluid mb-2 style = "height:200px; object-fit:cover;">
                          <h5>${e.nome} </h5>
                          <p>R$${e.precoPorHora} </p>`;

      divQuadra.addEventListener("click", () => {
        mostrarDetalhes(e);
      });

      divQuadra.innerHTML += "<br>"
      return divList.appendChild(divQuadra);

    });
  });
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('toggle-senha') || e.target.classList.contains('bi-eye-slash')) {
    const icon = e.target;
    const input = icon.previousElementSibling;

    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('bi-eye');
      icon.classList.add('bi-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('bi-eye-slash');
      icon.classList.add('bi-eye');
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarQuadras();

  document.getElementById("inputPesquisa").addEventListener("input", (p) => {
    const letrasDigitadas = p.target.value.toLowerCase().trim();
    const filtradas = todasAsQuadras.filter(f =>
      f.nome.toLowerCase().includes(letrasDigitadas)
    );
    renderizarQuadras(filtradas);
    //tentar fazer um tratamento para evitar digitar algo sem sentido 
  });
});


async function removerHorario(quadraId, data, horario) {
  try {
    // Busca a quadra
    const { data: quadra } = await axios.get(
      `http://localhost:3000/quadras/${quadraId}`
    );

    // Remove o horário
    quadra.horariosDisponiveis[data] =
      quadra.horariosDisponiveis[data].filter(
        h => h !== horario
      );

    // Atualiza a quadra
    await axios.put(
      `http://localhost:3000/quadras/${quadraId}`,
      quadra
    );

    console.log("Horário removido com sucesso!");
  } catch (error) {
    console.error(error);
  }
}

async function cancelarReserva(id) {
  try {
    // Busca a reserva
    const { data: reserva } = await axios.get(
      `http://localhost:3000/reservas/${id}`
    );

    // Busca a quadra
    const { data: quadra } = await axios.get(
      `http://localhost:3000/quadras/${reserva.quadraId}`
    );

    // Formato armazenado na quadra
    const horarioCompleto = reserva.hora + ":00";

    // Se a data não existir, cria
    if (!quadra.horariosDisponiveis[reserva.data]) {
      quadra.horariosDisponiveis[reserva.data] = [];
    }

    // Adiciona novamente o horário
    quadra.horariosDisponiveis[reserva.data].push(horarioCompleto);

    // Ordena os horários
    quadra.horariosDisponiveis[reserva.data].sort();

    // Atualiza a quadra
    await axios.put(
      `http://localhost:3000/quadras/${reserva.quadraId}`,
      quadra
    );

    // Remove a reserva
    await axios.delete(
      `http://localhost:3000/reservas/${id}`
    );

    alert("Reserva cancelada com sucesso!");
    mostrarReservas();

  } catch (error) {
    console.error(error);
    alert("Erro ao cancelar reserva.");
  }
}

async function renderizarReservas(reservas) {
  const divList = document.getElementById("tela-reservas");

  divList.innerHTML = "";

  for (const reserva of reservas) {
    try {
      // Busca os dados da quadra
      const response = await axios.get(
        `http://localhost:3000/quadras/${reserva.quadraId}`
      );

      const quadra = response.data;

      const card = document.createElement("div");
      card.className = "card p-3 mb-3";

      let dataFormatada = new Date(reserva.data).toLocaleDateString('pt-BR');

      card.innerHTML = `
        <img src="${quadra.fotos[0]}"
             class="img-fluid mb-2"
             style="height:200px; object-fit:cover;">

        <h5>${quadra.nome}</h5>

        <p>
          <strong>Data:</strong> ${dataFormatada}<br>
          <strong>Horário:</strong> ${reserva.hora}<br>
          <strong>Preço:</strong> R$ ${quadra.precoPorHora}<br>
          <strong>Bairro:</strong>  ${quadra.bairro}<br>
          <strong>Cidade:</strong>  ${quadra.cidade}<br>
          <strong>Endereço:</strong>  ${quadra.rua}
        </p>

        <button class="btn btn-danger"
                onclick="cancelarReserva('${reserva.id}')">
          Cancelar Reserva
        </button>
      `;

      divList.appendChild(card);

    } catch (error) {
      console.error(error);
    }
  }
}

async function mostrarReservas() {
  try {
    let url = "http://localhost:3000/reservas";
    const response = await axios.get(url);
    todasAsReservas = response.data;

    renderizarReservas(todasAsReservas);
    console.log(todasAsReservas);
  }
  catch (Error) {
    console.log(Error);
  }
}
