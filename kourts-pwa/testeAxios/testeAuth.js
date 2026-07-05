/* ══════════════════════════════════════════
   ESTADO GLOBAL
   ══════════════════════════════════════════ */
let telaAnterior = "tela-home";
let telaAtual = "tela-home";

let todasAsQuadras = [];   // guarda todas as quadras para a pesquisa
let quadraPendente = null; // guarda o id da quadra que o usuário tentou agendar antes de logar
let tokenApelido;          // guarda o retorno da API de login/cadastro


/* ══════════════════════════════════════════
   NAVEGAÇÃO ENTRE TELAS
   ══════════════════════════════════════════ */
function navegar(destino) {
  let telas = document.getElementsByClassName("tela");
  Array.from(telas).forEach((element) => {
    element.classList.remove("show");
    element.classList.add("collapse");
  });

  const searchWrapper = document.querySelector('.search-wrapper');
  if (destino === 'tela-user' || destino === 'tela-reservas') {
    searchWrapper.style.display = 'none';
  } else {
    searchWrapper.style.display = '';
  }

  if (destino === 'tela-reservas') {
    buscarReservas();
  }

  document.getElementById(destino).classList.remove("collapse");
  document.getElementById(destino).classList.add("show");
  telaAnterior = telaAtual;
  telaAtual = destino;
}

function voltar() {
  navegar(telaAnterior);
}


/* ══════════════════════════════════════════
   AUTENTICAÇÃO (helpers)
   ══════════════════════════════════════════ */
function estaLogado() {
  return !!localStorage.getItem("token");
}

// Chamado pelo botão AGENDAR do modal de detalhes.
// Se não estiver logado, guarda a quadra escolhida e abre o login/cadastro.
// Se já estiver logado, vai direto pro agendamento.
function tentarAgendar(quadraId) {
  if (!estaLogado()) {
    quadraPendente = quadraId;
    fecharModal();      // fecha o modal de detalhes
    abrirModalAuth();
  } else {
    fecharModal();
    abrirAgendamento(quadraId);
  }
}

function abrirModalAuth() {
  const modal = document.getElementById("modal-auth");
  modal.classList.remove("collapse");
  modal.classList.add("show");
  mudaBt('login');
}

function fecharModalAuth(event) {
  // se veio de um clique, só fecha se o clique foi no overlay (fora do card)
  if (event && event.target !== document.querySelector("#modal-auth .modal-overlay")) return;
  const modal = document.getElementById("modal-auth");
  modal.classList.remove("show");
  modal.classList.add("collapse");
  quadraPendente = null; // cancelou o login, cancela também a intenção de agendar
}

// Depois de um login/cadastro com sucesso: fecha o modal de auth
// e, se havia uma quadra pendente de agendamento, retoma o fluxo nela.
function aoAutenticarComSucesso() {
  const modal = document.getElementById("modal-auth");
  modal.classList.remove("show");
  modal.classList.add("collapse");

  if (quadraPendente) {
    const quadraId = quadraPendente;
    quadraPendente = null;
    abrirAgendamento(quadraId);
  }
}

// Troca de aba dentro do modal de login/cadastro
function mudaBt(tela) {
  const formularios = document.getElementsByClassName('formulario');
  Array.from(formularios).forEach(f => f.classList.remove('show'));

  const tabLogin    = document.getElementById('tab-login');
  const tabCadastro = document.getElementById('tab-cadastro');

  if (tela === 'login') {
    document.getElementById('formulario-login').classList.add('show');
    tabLogin.classList.add('ativo');
    tabCadastro.classList.remove('ativo');
  } else {
    document.getElementById('formulario-cadastro').classList.add('show');
    tabCadastro.classList.add('ativo');
    tabLogin.classList.remove('ativo');
  }
}


/* ══════════════════════════════════════════
   MÁSCARAS DE INPUT (telefone / cpf)
   ══════════════════════════════════════════ */
const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('focus', () => {
  if (inputTelefone.value === '(__) _____-____') {
    inputTelefone.setSelectionRange(0, 0);
  }
});

inputTelefone.addEventListener('keydown', (e) => {
  e.preventDefault();

  let numeros = inputTelefone.value.replace(/\D/g, '').replace(/_/g, '');

  if (e.key === 'Backspace') {
    numeros = numeros.slice(0, -1);
  }

  if (/^\d$/.test(e.key) && numeros.length < 11) {
    numeros += e.key;
  }

  let mascara = '(__) _____-____'.split('');
  const posicoes = [1, 2, 5, 6, 7, 8, 9, 11, 12, 13, 14];

  numeros.split('').forEach((num, index) => {
    if (posicoes[index] !== undefined) {
      mascara[posicoes[index]] = num;
    }
  });

  inputTelefone.value = mascara.join('');

  const proximo = inputTelefone.value.indexOf('_');
  if (proximo !== -1) {
    inputTelefone.setSelectionRange(proximo, proximo);
  }
});

// Validação de CPF com máscara personalizada
const inputCpf = document.getElementById('cpf');

inputCpf.addEventListener('focus', () => {
  if (inputCpf.value === '___.___.___-__') {
    inputCpf.setSelectionRange(0, 0);
  }
});

inputCpf.addEventListener('keydown', (e) => {
  e.preventDefault();

  let numeros = inputCpf.value.replace(/\D/g, '').replace(/_/g, '');

  if (e.key === 'Backspace') {
    numeros = numeros.slice(0, -1);
  }

  if (/^\d$/.test(e.key) && numeros.length < 11) {
    numeros += e.key;
  }

  let mascara = '___.___.___-__'.split('');
  const posicoes = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13];

  numeros.split('').forEach((num, index) => {
    mascara[posicoes[index]] = num;
  });

  inputCpf.value = mascara.join('');

  const proximo = inputCpf.value.indexOf('_');
  if (proximo !== -1) {
    inputCpf.setSelectionRange(proximo, proximo);
  }
});

/* Validação para o CEP — DESATIVADA (campo não existe no formulário no momento).
   Descomente e adicione um <input id="cep"> no HTML quando o campo voltar a ser usado.

const inputCep = document.getElementById('cep');

inputCep.addEventListener('focus', () => {
  if (inputCep.value === '_____-___') {
    inputCep.setSelectionRange(0, 0);
  }
});

inputCep.addEventListener('keydown', (e) => {
  e.preventDefault();

  let numeros = inputCep.value.replace(/\D/g, '').replace(/_/g, '');

  if (e.key === 'Backspace') {
    numeros = numeros.slice(0, -1);
  }

  if (/^\d$/.test(e.key) && numeros.length < 8) {
    numeros += e.key;
  }

  let mascara = '_____-___'.split('');
  const posicoes = [0, 1, 2, 3, 4, 6, 7, 8];

  numeros.split('').forEach((num, index) => {
    mascara[posicoes[index]] = num;
  });

  inputCep.value = mascara.join('');

  const proximo = inputCep.value.indexOf('_');
  if (proximo !== -1) {
    inputCep.setSelectionRange(proximo, proximo);
  }
});
*/


/* ══════════════════════════════════════════
   LOGIN / CADASTRO
   ══════════════════════════════════════════ */
function criarJogador() {

  const apiUrl = 'http://localhost:8081/auth/registrar';
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const telefone = document.getElementById('telefone').value;
  const apelido = document.getElementById('apelido').value;
  const cpf = document.getElementById('cpf').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const estado = document.getElementById('estado').value;
  const cidade = document.getElementById('cidade').value;

  const jogador = {
    "nome": nome,
    "email": email,
    "senha": senha,
    "telefone": telefone,
    "apelido": apelido,
    "cpf": cpf,
    "sobrenome": sobrenome,
    "local": {
      "estado": estado,
      "cidade": cidade
    }
  };

  axios.post(apiUrl, jogador)
    .then(response => {
      console.log('Jogador criado com sucesso:', response.data);
      const mensagemElement = document.getElementById('error-cadastro');
      mensagemElement.textContent = `Jogador criado com sucesso!`;

      const retornoApi = response.data;
      tokenApelido = retornoApi;

      // ajuste "retornoApi.token" conforme o formato real que a API devolver
      localStorage.setItem("token", retornoApi.token ?? JSON.stringify(retornoApi));

      aoAutenticarComSucesso();
    })
    .catch(error => {
      const { data } = error.response;
      console.log(error.response.data);

      data.error = "Erro ao criar jogador. Verifique os dados e tente novamente.";

      const mensagemElement = document.getElementById('error-cadastro');
      mensagemElement.textContent = `${error.response.data}`;
    });
}

function login() {

  const apiUrl = 'http://localhost:8081/auth/login';
  const apelido = document.getElementById('login-apelido').value;
  const senha = document.getElementById('login-senha').value;

  const login = {
    "apelido": apelido,
    "senha": senha
  };

  axios.post(apiUrl, login)
    .then(response => {
      console.log('Login efetuado com sucesso:', response.data);
      const retornoApi = response.data;
      tokenApelido = retornoApi;

      // ajuste "retornoApi.token" conforme o formato real que a API devolver
      localStorage.setItem("token", retornoApi.token ?? JSON.stringify(retornoApi));

      aoAutenticarComSucesso();
    })
    .catch(error => {
      const { data } = error.response;
      console.log(error.response.data);

      data.error = "Erro ao efetuar login. Verifique os dados e tente novamente.";

      const mensagemElement = document.getElementById('error-login');
      mensagemElement.textContent = `${error.response.data}`;
    });
}


/* ══════════════════════════════════════════
   MODAL DE DETALHES DA QUADRA
   ══════════════════════════════════════════ */
function mostrarDetalhes(quadra) {
  const modal = document.getElementById("modal-detalhes");

  let imagensHTML = "";
  (quadra.fotos || []).forEach((foto, index) => {
    imagensHTML += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="http://localhost:8081/fotos/${foto}"
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
          <li><strong>Endereço:</strong> ${quadra.rua || "Não informado"}</li>
          <li><strong>Jogadores:</strong> ${quadra.qtdJogadores || "Não informado"}</li>
          <li><strong>Dimensões:</strong> ${quadra.largura || "?"}m x ${quadra.comprimento || "?"}m</li>
          <li><strong>Esporte:</strong> ${quadra.esporte || "Não informado"}</li>
        </ul>

        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-secondary w-50" onclick="fecharModal()">Voltar</button>
          <button class="btn btn-success w-50 fw-bold" onclick="tentarAgendar('${quadra.id}')">AGENDAR</button>
        </div>

      </div>
    </div>`;

  modal.classList.remove("collapse");
  modal.classList.add("show");
}

function fecharModal(event) {
  if (event && event.target !== document.querySelector("#modal-detalhes .modal-overlay")) return;
  const modal = document.getElementById("modal-detalhes");
  modal.classList.remove("show");
  modal.classList.add("collapse");
}


/* ══════════════════════════════════════════
   MODAL DE AGENDAMENTO
   ══════════════════════════════════════════ */
let horariosCache = {}; // guarda os horários já buscados

async function abrirAgendamento(quadraId) {
  const modal = document.getElementById("modal-agendamento");
  const semana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  try {
    const response = await axios.get(`http://localhost:8081/quadras/${quadraId}/horarios-disponiveis?dias=7`);
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
  document.querySelectorAll(".dia-bolinha").forEach(b => b.classList.remove("ativo"));
  el.querySelector(".dia-bolinha").classList.add("ativo");

  const horariosContainer = document.getElementById("horarios-container");
  const horariosLabel = document.getElementById("horarios-label");
  const slotsContainer = document.getElementById("slots-container");
  const btnConfirmar = document.getElementById("btn-confirmar");

  const horarios = horariosCache[dataKey] || [];

  horariosLabel.textContent = `Horários disponíveis`;
  horariosContainer.style.display = "block";
  btnConfirmar.style.display = "none";

  if (horarios.length === 0) {
    slotsContainer.innerHTML = `<span class="text-muted">Nenhum horário disponível neste dia.</span>`;
    return;
  }

  slotsContainer.innerHTML = horarios.map(h => {
    const horaFormatada = h.substring(0, 5);
    return `
      <button class="btn btn-success slot-horario" id="botaoHorario"
              onclick="selecionarHorario(this, '${dataKey}', '${horaFormatada}')">
        ${horaFormatada}
      </button>`;
  }).join("");
}

function selecionarHorario(el, data, hora) {
  document.querySelectorAll(".slot-horario").forEach(b => b.classList.remove("active", "btn-success"));
  el.classList.add("active", "btn-success");
  el.classList.remove("btn-outline-success");

  document.getElementById("modal-agendamento").dataset.dataSelecionada = data;
  document.getElementById("modal-agendamento").dataset.horaSelecionada = hora;
  document.getElementById("btn-confirmar").style.display = "block";
}

async function confirmarAgendamento(quadraId) {
  const modal = document.getElementById("modal-agendamento");
  const data = modal.dataset.dataSelecionada;
  const hora = modal.dataset.horaSelecionada;

  const [h, m, s] = hora.split(":").map(Number);
  const fim = `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s ?? 0).padStart(2, "0")}`;

  try {
    await axios.post("http://localhost:8081/reservas", {
      data,
      inicio: hora,
      fim,
      situacao: "APROVADA",
      quadra: {
        id: quadraId,
      },
    });
    alert(`Agendamento confirmado!\nData: ${data}\nHorário: ${hora}`);
    fecharAgendamento();
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


/* ══════════════════════════════════════════
   LISTAGEM E PESQUISA DE QUADRAS
   ══════════════════════════════════════════ */
async function mostrarQuadras() {
  try {
    let url = "http://localhost:8081/quadras";
    const response = await axios.get(url);
    todasAsQuadras = response.data;
    renderizarQuadras(todasAsQuadras);
  } catch (error) {
    console.log(error);
  }
}

function renderizarQuadras(quadras) {
  const divList = document.getElementById("tela-home");
  divList.innerHTML = ``;

  quadras.forEach((e) => {
    const divQuadra = document.createElement("div");
    divQuadra.className = "card p-2 mb-3";

    let imagensHTML = "";
    (e.fotos || []).forEach(foto => {
      imagensHTML += `<img src="http://localhost:8081/fotos/${foto}"
                           class="img-fluid mb-2"
                           style="height:200px; object-fit:cover;">`;
    });

    divQuadra.innerHTML = `${imagensHTML}
                          <h5>${e.nome}</h5>
                          <p> Valor: R$${e.precoPorHora} <br>
                           Esporte: ${e.esporte} <br>
                           Rua: ${e.rua} </p>`;

    divQuadra.addEventListener("click", () => {
      mostrarDetalhes(e);
    });

    divList.appendChild(divQuadra);
  });
}


/* ══════════════════════════════════════════
   RESERVAS
   ══════════════════════════════════════════ */
async function buscarReservas() {
  try {
    let url = "http://localhost:8081/reservas";
    const response = await axios.get(url);
    const reservas = response.data;
    renderizarReservas(reservas);
  } catch (error) {
    console.log(error);
    alert("Erro ao buscar reservas.");
  }
}

function renderizarReservas(reservas) {
  const listaReservas = document.getElementById("lista-reservas");
  listaReservas.innerHTML = "";

  if (reservas.length === 0) {
    listaReservas.innerHTML = `<p class="text-center text-white-50 mt-4">Você ainda não tem reservas.</p>`;
    return;
  }

  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  reservas.forEach((reserva) => {
    const [ano, mes, dia] = reserva.data.split("-");
    const nomeMes = meses[parseInt(mes, 10) - 1];

    const horaInicio = reserva.inicio?.slice(0, 5) ?? "";
    const horaFim = reserva.fim?.slice(0, 5) ?? "";
    const preco = reserva.quadra?.precoPorHora ?? 0;

    const cardReserva = document.createElement("div");
    cardReserva.className = "reserva-card";
    cardReserva.innerHTML = `
              <div class="reserva-topo">
                <h5 class="reserva-nome">${reserva.quadra?.nome ?? "Quadra"} <button class="btn btn-danger ms-5" onclick="cancelarReserva(${reserva.id})">CANCELAR</button></h5>
              </div>

              <div class="reserva-info">
                <i class="bi bi-calendar3"></i>
                <span class="reserva-data"><strong>${dia}/${nomeMes}</strong><br></span>
              </div>

              <div class="reserva-info">
                <i class="bi bi-clock"></i>
                <span>${horaInicio} - ${horaFim}</span>
              </div>

              <div class="reserva-rodape">
                <span><strong>Total:</strong> R$${preco.toFixed(2).replace(".", ",")}<br></span>
                <span><strong>Situação:</strong> ${reserva.situacao}</span>
              </div>

              <hr class="reserva-linha">
            `;
    listaReservas.appendChild(cardReserva);
  });
}

async function cancelarReserva(id) {
  if (!confirm("Deseja realmente cancelar essa reserva?")) return;
  try {
    await axios.delete(`http://localhost:8081/reservas/${id}`);
    alert("Reserva Cancelada!");
    buscarReservas();
  } catch (error) {
    console.log(error);
    alert("Erro ao cancelar reserva.");
  }
}


/* ══════════════════════════════════════════
   TOGGLE DE SENHA (tela de perfil)
   ══════════════════════════════════════════ */
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


/* ══════════════════════════════════════════
   INICIALIZAÇÃO
   ══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  mostrarQuadras();

  document.getElementById("inputPesquisa").addEventListener("input", (p) => {
    const letrasDigitadas = p.target.value.toLowerCase().trim();
    const filtradas = todasAsQuadras.filter(f =>
      f.nome.toLowerCase().includes(letrasDigitadas)
    );
    renderizarQuadras(filtradas);
  });
});