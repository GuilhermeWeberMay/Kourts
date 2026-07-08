let telaAnterior = "tela-home";
let telaAtual = "tela-home";
let quadraPendente = null; //guarda o id da quadra que o usuário tentou agendar antes de fazer o login
let tokenApelido; // guarda o retorno da API de login/cadastro

//armazena todas as quadras para nós utilizarmos na pesquisa
let todasAsQuadras = [];
let telaPendente = null;

function atualizarFundo() {
    const idDosModais = ["modal-auth", "modal-detalhes", "modal-agendamento"];
    const algumModalAberto = idDosModais.some(id => {
        const el = document.getElementById(id);
        return el && el.classList.contains("show");
    });

    document.body.classList.toggle("modal-open", algumModalAberto);
    const footer = document.getElementById("footer");
    if (footer) footer.style.display = algumModalAberto ? "none" : "";
}

function navegar(destino) {
  if (destino === 'tela-user' && !estaLogado()) {
      telaPendente = 'tela-user';
      abrirModalAuth();
      return; //não deixa a tela de perfil abrir sem login
  }

  let telas = document.getElementsByClassName("tela");
  Array.from(telas).forEach((element) => {
    element.classList.remove("show");
    element.classList.add("collapse");
  });
  const searchWrapper = document.querySelector('.search-wrapper');
  if(destino === 'tela-user' || destino === 'tela-reservas') {
    searchWrapper.style.display = 'none';
  }else {
    searchWrapper.style.display = '';
  }

  if (destino === 'tela-reservas'){
    buscarReservas();
  }

  if (destino === 'tela-user'){
    preencherPerfil();
  }

  document.getElementById(destino).classList.remove("collapse");
  document.getElementById(destino).classList.add("show");
  telaAnterior = telaAtual;
  telaAtual = destino;
}

function voltar() {
  navegar(telaAnterior);
}

function estaLogado() {
   return !!localStorage.getItem("token");
}

function tentarAgendar(quadraId){
    if(!estaLogado()) {
       quadraPendente = quadraId;
       fecharModal();
       abrirModalAuth();
    }
    else {
       fecharModal();
       abrirAgendamento(quadraId);
    }
}

function abrirModalAuth(){
    const modal = document.getElementById("modal-auth");
    modal.classList.remove("collapse");
    modal.classList.add("show");
    atualizarFundo();
    mudaBt('login');
}

function fecharModalAuth(event) {
    // se veio de um clique, só fecha se o clique foi no overlay (fora do card)
    if(event && event.target !== document.querySelector("#modal-auth .modal-overlay")) return;
    const modal = document.getElementById("modal-auth");
    modal.classList.remove("show");
    modal.classList.add("collapse");
    atualizarFundo();
    quadraPendente = null; //cancelou o login, cancela também a intenção de agendar
    telaPendente = null;
}

//Depois de um login/cadastro com sucesso a gente fecha o modal de auth
// e, se tinha uma quadra pendente de agendamento, retoma o fluxo nela.
function aoAutenticarComSucesso(){
    const modal = document.getElementById("modal-auth");
    modal.classList.remove("show");
    modal.classList.add("collapse");
    atualizarFundo();

    if (quadraPendente) {
       const quadraId = quadraPendente;
       quadraPendente = null;
       abrirAgendamento(quadraId);
    }
}

function mudaBt(tela){
    const formularios = document.getElementsByClassName('formulario');
    Array.from(formularios).forEach(f => f.classList.remove("show"));

    const tabLogin = document.getElementById('tab-login');
    const tabCadastro = document.getElementById('tab-cadastro');

    if (tela === 'login'){
        document.getElementById('formulario-login').classList.add("show");
        tabLogin.classList.add('ativo');
        tabCadastro.classList.remove('ativo');
    }
    else {
        document.getElementById('formulario-cadastro').classList.add("show")
        tabCadastro.classList.add('ativo');
        tabLogin.classList.remove('ativo')
    }
}

//máscaras de input (telefone e cpf)
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
 
 
// LOGIN E CADASTRO
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
      localStorage.setItem("token", retornoApi.token ?? retornoApi);
 
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
      localStorage.setItem("token", retornoApi.token ?? retornoApi);
 
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

function aoAutenticarComSucesso() {
    const modal = document.getElementById("modal-auth");
    modal.classList.remove("show");
    modal.classList.add("collapse");
    atualizarFundo();

    if (quadraPendente) {
       const quadraId = quadraPendente;
       quadraPendente = null;
       abrirAgendamento(quadraId);
    }
    else if (telaPendente) {
        const destino = telaPendente;
        telaPendente = null;
        navegar(destino);
    }
}

let jogadorAtual = null;

function preencherPerfil() {
    const apelido = localStorage.getItem("token");
    if (!apelido) return;

    axios.get(`http://localhost:8081/jogadores/${apelido}`)
      .then(response => {
          jogadorAtual = response.data;
          document.getElementById("perfil-titulo-apelido").textContent = jogadorAtual.apelido;
          document.getElementById("perfil-apelido").value = jogadorAtual.apelido;
          document.getElementById("perfil-nome").value = jogadorAtual.nome;
          document.getElementById("perfil-sobrenome").value = jogadorAtual.sobrenome;
          document.getElementById("perfil-email").value = jogadorAtual.email;
          document.getElementById("perfil-telefone").value = jogadorAtual.telefone;
      })
      .catch(error => {
          console.log(error);
          alert("Erro ao carregar dados do perfil.");
      });
}

function validaDadosPerfil(apelido, email) {
    if(!apelido || apelido.trim().length === 0) {
        return "O apelido não pode ficar vazio.";
    }
    if (apelido.trim().length < 4) {
        return "O apelido deve ter no mínimo 4 caracteres.";
    }
    if (!email || email.trim().length === 0) {
        return "O e-mail não pode ficar vazio.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return "Informe um e-mail válido.";
    }
    return null;
}

function salvarPerfil(){
    if (!jogadorAtual) {
        alert("Aguarde o carregamento dos dados e tente novamente.");
          return;
    }

    const erroEl = document.getElementById("perfil-erro");
    erroEl.textContent = "";

    const novoApelido = document.getElementById("perfil-apelido").value.trim();
    const novoEmail = document.getElementById("perfil-email").value.trim();
    const senhaAtual = document.getElementById("perfil-senha-atual").value;
    const novaSenha = document.getElementById("perfil-nova-senha").value;
    const confirmarSenha = document.getElementById("perfil-confirmar-senha").value;

    const erroValidacao = validaDadosPerfil(novoApelido, novoEmail);
    if(erroValidacao) {
        erroEl.textContent = erroValidacao;
        return;
    }

    let senhaFinal = jogadorAtual.senha;
    const tentouTrocarSenha = senhaAtual || novaSenha || confirmarSenha;

    if (tentouTrocarSenha) {
      
        if (senhaAtual !== jogadorAtual.senha) {
          erroEl.textContent = "Senha atual incorreta.";
          return;
        }
        if (!novaSenha || novaSenha.trim().lenght === 0) {
          erroEl.textContent = "Informe a nova senha.";
          return;
        }
        if (novaSenha !== confirmarSenha) {
          erroEl.textContent = "A nova senha e a confirmação não coincidem.";
          return;
        }
        senhaFinal = novaSenha;
    }

    const jogadorAtualizado = {
    id: jogadorAtual.id,          
    nome: jogadorAtual.nome,
    sobrenome: jogadorAtual.sobrenome,
    telefone: jogadorAtual.telefone,
    cpf: jogadorAtual.cpf,
    permissoes: jogadorAtual.permissoes,
    local: jogadorAtual.local,
    apelido: novoApelido,
    email: novoEmail,
    senha: senhaFinal
    };

    axios.put(`http://localhost:8081/jogadores/${jogadorAtual.apelido}`, jogadorAtualizado)
      .then(response => {
          jogadorAtual = response.data;
          localStorage.setItem("token", jogadorAtual.apelido);
          document.getElementById("perfil-titulo-apelido").textContent = jogadorAtual.apelido;
          alert("Perfil atualizado com sucesso!");
          document.getElementById("perfil-senha-atual").value = "";
          document.getElementById("perfil-nova-senha").value = "";
          document.getElementById("perfil-confirmar-senha").value = "";
      })
      .catch(erro => {
          console.log(erro);
          erroEl.textContent = erro.response?.data?? "Erro ao atualizar Perfil";
      });

}

// Abre o modal de detalhes da quadra (sem horários)
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
          <li> <strong>Endereço:</strong> ${quadra.rua || "Não informado"}</li>
          <li> <strong>Jogadores:</strong> ${quadra.qtdJogadores || "Não informado"}</li>
          <li> <strong>Dimensões:</strong> ${quadra.largura || "?"}m x ${quadra.comprimento || "?"}m</li>
          <li> <strong>Esporte:</strong> ${quadra.esporte || "Não informado"}</li>
        </ul>

        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-secondary w-50" onclick="fecharModal()">Voltar</button>
          <button class="btn btn-success w-50 fw-bold" onclick="tentarAgendar('${quadra.id}')">AGENDAR</button>
        </div>

      </div>
    </div>`;

  modal.classList.remove("collapse");
  modal.classList.add("show");
  atualizarFundo();
}

let horariosCache = {}; // guarda os horários já buscados

async function abrirAgendamento(quadraId) {
  const modal = document.getElementById("modal-agendamento");
  const semana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  // Busca os horários dos próximos 7 dias de uma vez
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
  atualizarFundo();
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
  const horarios = horariosCache[dataKey] || [];

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
      <button class="btn btn-success slot-horario" id="botaoHorario"
              onclick="selecionarHorario(this, '${dataKey}', '${horaFormatada}')">
        ${horaFormatada}
      </button>`;
  }).join("");
}


//  Seleciona um horário
function selecionarHorario(el, data, hora) {
  document.querySelectorAll(".slot-horario").forEach(b => b.classList.remove("active", "btn-success"));
  el.classList.add("active", "btn-success");
  el.classList.remove("btn-outline-success");

  // Guarda no modal para usar no confirmar
  document.getElementById("modal-agendamento").dataset.dataSelecionada = data;
  document.getElementById("modal-agendamento").dataset.horaSelecionada = hora;
  document.getElementById("btn-confirmar").style.display = "block";
}

//  Confirma o agendamento
async function confirmarAgendamento(quadraId) {
  const modal = document.getElementById("modal-agendamento");
  const data = modal.dataset.dataSelecionada;
  const hora = modal.dataset.horaSelecionada;

  //Calcula o horário de fim (1h de duração sempre)
  const [h, m, s] = hora.split(":").map(Number);
  const fim = `${String(h + 1).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s ?? 0).padStart(2, "0")}`;

  try {
    await axios.post("http://localhost:8081/reservas", {
      data,
      inicio : hora ,
      fim,
      situacao : "APROVADA",
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
  atualizarFundo();
}

function fecharModal(event) {
  if (event && event.target !== document.querySelector("#modal-detalhes .modal-overlay")) return;
  const modal = document.getElementById("modal-detalhes");
  modal.classList.remove("show");
  modal.classList.add("collapse");
  atualizarFundo();
}

async function mostrarQuadras() {
 try {
  let url = "http://localhost:8081/quadras";
  const response = await axios.get(url);
  todasAsQuadras = response.data
  renderizarQuadras(todasAsQuadras);
  console.log(todasAsQuadras);
 }
 catch(Error)
 {
  console.log(Error);
 }
} 

  function renderizarQuadras(quadras){
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
                          <p> Valor: R$${e.precoPorHora} <br>
                           Esporte: ${e.esporte} <br>
                           Rua: ${e.rua} </p>`;

  divQuadra.addEventListener("click", () => {
          mostrarDetalhes(e);
  }); 

    divQuadra.innerHTML+= "<br>"
   return divList.appendChild(divQuadra);

  });
 });
}


//Funções da parte de Reservas
async function buscarReservas(){
  
    try {
      let url = "http://localhost:8081/reservas";
      const response = await axios.get(url);
      const reservas = response.data;

      renderizarReservas(reservas);
    }
    catch (error){
      console.log(error);
      alert("Erro ao buscar reservas.");
    }
}

function renderizarReservas(reservas) {
   const listaReservas = document.getElementById("lista-reservas");
   listaReservas.innerHTML = "";

   if(reservas.length === 0) {
     listaReservas.innerHTML = `<p class="text-center text-white-50 mt-4"> Você ainda não tem reservas. </p>`;
     return;
   }

   const meses = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
   ]

    reservas.forEach((reserva) => {
      const [ano, mes, dia] = reserva.data.split("-");
      const nomeMes = meses[parseInt(mes, 10) - 1];

      const horaInicio = reserva.inicio?.slice(0,5)??"";
      const horaFim = reserva.fim?.slice(0,5) ?? "";

      const preco = reserva.quadra?.precoPorHora ?? 0;

       const cardReserva = document.createElement("div");
       cardReserva.className = "reserva-card";
       cardReserva.innerHTML = `
              <div class="reserva-topo">
                <h5 class="reserva-nome">${reserva.quadra?.nome ?? "Quadra"} <button class="btn btn-danger ms-5" onclick="cancelarReserva(${reserva.id})">CANCELAR</button> </h5>
                
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
                <span><strong>Total:</strong> R$${preco.toFixed(2).replace(".",",")}<br></span>
                <span><strong>Situação:</strong> ${reserva.situacao}</span>
              </div>  

                            <hr class="reserva-linha">
            `;
            listaReservas.appendChild(cardReserva);
    });
}

function logout() {
    if (!confirm("Deseja sair da sua conta?")) return;

    localStorage.removeItem("token");
    jogadorAtual = null;
    navegar("tela-home");
}

async function cancelarReserva(id){
    if(!confirm("Deseja realmente cancelar essa reserva?")) return;
    try {
      await axios.delete(`http://localhost:8081/reservas/${id}`);
      alert("Reserva Cancelada!");
      buscarReservas(); //Atualiza a lista
    }
    catch (error)
    {
      console.log(error);
      alert("Erro ao cancelar reserva.");
    }
}

document.addEventListener('click', function(e) {
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