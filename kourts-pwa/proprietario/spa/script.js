/* ============ CONFIG DA API ============ */
const API_BASE = "http://localhost:8081";

/* Endpoint usado para buscar o nome do cliente de uma reserva.
   Só é usado se a API devolver um id de cliente dentro de /reservas.
   Ajuste o caminho conforme o endpoint real da sua API (ex: '/clientes' ou '/usuarios'). */
const CLIENTE_ENDPOINT = "/clientes";

/* Cache simples pra não buscar o mesmo cliente/quadra várias vezes na mesma tela */
const cacheClientes = new Map();
const cacheQuadras = new Map();

/* ID do proprietário logado. Como combinado, isso faz o papel do "token":
   não é um JWT, é o próprio id do proprietário devolvido pela API no
   login/cadastro. Fica em memória (proprietarioId) e também salvo no
   localStorage, pra sobreviver a um F5 da página. */
let proprietarioId = null;

/* ============ NAVEGAÇÃO ENTRE TELAS (Reservas / Quadras) ============ */
function navegar(destino, botaoClicado) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('visivel'));

  const alvo = document.getElementById(destino);
  if (alvo) alvo.classList.add('visivel');

  if (botaoClicado) {
    document.querySelectorAll('.spa-tab').forEach(b => b.classList.remove('ativo'));
    botaoClicado.classList.add('ativo');
  }

  if (destino === 'tela-reservas') carregarReservas();
  if (destino === 'tela-quadras') carregarQuadras();
}

/* ============ AUTENTICAÇÃO DO PROPRIETÁRIO (sem modal) ============ */

/* Troca entre as abas "Entrar" e "Criar Conta" dentro do card de autenticação. */
function mudaBt(aba) {
  const formLogin = document.getElementById('formulario-login');
  const formCadastro = document.getElementById('formulario-cadastro');
  const tabLogin = document.getElementById('tab-login');
  const tabCadastro = document.getElementById('tab-cadastro');

  const mostrarLogin = aba === 'login';

  formLogin.style.display = mostrarLogin ? 'flex' : 'none';
  formCadastro.style.display = mostrarLogin ? 'none' : 'flex';
  tabLogin.classList.toggle('ativo', mostrarLogin);
  tabCadastro.classList.toggle('ativo', !mostrarLogin);

  // Ao abrir a aba de cadastro, carrega os estados via BrasilAPI
  // (só busca de verdade na primeira vez, controlado por dataset.carregado)
  if (!mostrarLogin) carregarEstados('estado');
}

/* Esconde a tela de login/cadastro e libera o app (Reservas/Quadras).
   tela-auth é uma tela igual às outras (.tela / .visivel), então quem
   troca ela pra fora é o próprio navegar() — chamamos ele normalmente
   pra cair na tela de reservas, igual um clique na aba faria. */
function mostrarApp() {
  document.getElementById('nav').style.display = '';
  document.getElementById('cabecalho-proprietario').style.display = '';
  document.getElementById('spa-tabs').style.display = '';

  const nome = localStorage.getItem('proprietarioNome');
  const saudacao = document.getElementById('saudacao-proprietario');
  if (saudacao) saudacao.textContent = nome ? `Olá, ${nome}!` : 'Olá, meu Cria!';

  const botaoReservas = document.querySelector('.spa-tab');
  navegar('tela-reservas', botaoReservas);
}

/* Esconde o app (navbar, cabeçalho, abas) e mostra só a tela de
   login/cadastro, usando o mesmo mecanismo de .tela / .visivel. */
function mostrarAuth() {
  document.getElementById('nav').style.display = 'none';
  document.getElementById('cabecalho-proprietario').style.display = 'none';
  document.getElementById('spa-tabs').style.display = 'none';

  document.querySelectorAll('.tela').forEach(t => t.classList.remove('visivel'));
  document.getElementById('tela-auth').classList.add('visivel');

  mudaBt('login');
}

/* Chamado sempre que o login OU o cadastro do proprietário dão certo.
   Guarda o id devolvido pela API (usado como "token") e libera o app.

   OBS: assumi que a API devolve um objeto com pelo menos o campo "id"
   (ex: { id: 3, nome: "...", email: "..." }). Se a sua API devolver
   algo diferente (por exemplo só o id puro, ou um objeto tipo
   { proprietario: { id: 3 } }), me avisa que ajusto essa parte. */
function aoAutenticarComSucesso(retornoApi) {
  const id = (retornoApi && typeof retornoApi === 'object')
    ? (retornoApi.id ?? retornoApi.proprietario?.id)
    : retornoApi;

  const nome = (retornoApi && typeof retornoApi === 'object') ? retornoApi.nome : null;

  proprietarioId = id;
  localStorage.setItem('proprietarioId', id);
  if (nome) localStorage.setItem('proprietarioNome', nome);

  mostrarApp();
}

/* Extrai uma mensagem de erro legível da resposta do axios,
   já que a API às vezes devolve uma string, às vezes um objeto. */
function extrairMensagemErro(error, mensagemPadrao) {
  const data = error?.response?.data;
  if (!data) return mensagemPadrao;
  if (typeof data === 'string') return data;
  return data.message ?? data.error ?? mensagemPadrao;
}

function logout() {
  if (!confirm("Deseja sair da sua conta?")) return;
  proprietarioId = null;
  localStorage.removeItem('proprietarioId');
  localStorage.removeItem('proprietarioNome');

  const emailInput = document.getElementById('login-email');
  const senhaInput = document.getElementById('login-senha');
  if (emailInput) emailInput.value = '';
  if (senhaInput) senhaInput.value = '';

  const erroLogin = document.getElementById('error-login');
  if (erroLogin) erroLogin.textContent = '';

  mostrarAuth();
}

/* ============ CADASTRO PROPRIETÁRIO ============ */
function criarProprietario() {
  const apiUrl = `${API_BASE}/auth/registrarProprietario`;

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const telefone = document.getElementById('telefone').value;
  const cnpj = document.getElementById('cnpj').value;
  const estado = document.getElementById('estado').value;
  const cidade = document.getElementById('cidade').value;

  const proprietario = {
    "nome": nome,
    "email": email,
    "senha": senha,
    "telefone": telefone,
    "cnpj": cnpj,
    "local": {
      "estado": estado,
      "cidade": cidade
    }
  };

  const botao = document.getElementById('submit-cadastro');
  const mensagemElement = document.getElementById('error-cadastro');
  botao.disabled = true;
  mensagemElement.textContent = '';

  axios.post(apiUrl, proprietario)
    .then(response => {
      console.log('proprietário criado com sucesso:', response.data);
      aoAutenticarComSucesso(response.data);
    })
    .catch(error => {
      console.error(error);
      mensagemElement.textContent = extrairMensagemErro(
        error,
        'Erro ao criar proprietário. Verifique os dados e tente novamente.'
      );
    })
    .finally(() => {
      botao.disabled = false;
    });
}

/* ============ LOGIN PROPRIETÁRIO ============ */
function login() {
  const apiUrl = `${API_BASE}/auth/loginProprietario`;
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;

  const login = {
    "email": email,
    "senha": senha
  };

  const botao = document.getElementById('submit-login');
  const mensagemElement = document.getElementById('error-login');
  botao.disabled = true;
  mensagemElement.textContent = '';

  axios.post(apiUrl, login)
    .then(response => {
      console.log('Login efetuado com sucesso:', response.data);
      aoAutenticarComSucesso(response.data);
    })
    .catch(error => {
      console.error(error);
      mensagemElement.textContent = extrairMensagemErro(
        error,
        'Erro ao efetuar login. Verifique os dados e tente novamente.'
      );
    })
    .finally(() => {
      botao.disabled = false;
    });
}

/* ============ BUSCA / FILTRO DE RESERVAS ============ */
function filtrarReservas(texto) {
  const termo = texto.toLowerCase();
  document.querySelectorAll('#lista-reservas .reserva-row').forEach(item => {
    item.style.display = item.dataset.busca.includes(termo) ? 'flex' : 'none';
  });
}

/* ============ RESERVAS: BUSCAR NA API ============ */
async function carregarReservas() {
  const lista = document.getElementById('lista-reservas');
  lista.innerHTML = '<p class="painel-sub">Carregando reservas...</p>';

  try {
    const resp = await fetch(`${API_BASE}/reservas`);
    if (!resp.ok) throw new Error(`Erro ${resp.status}`);
    const reservas = await resp.json();
    await renderizarReservas(reservas);
  } catch (err) {
    console.error('Erro ao carregar reservas:', err);
    lista.innerHTML = '<p class="painel-sub">Não foi possível carregar as reservas. Verifique se a API está rodando em ' + API_BASE + '.</p>';
  }
}

async function renderizarReservas(reservas) {
  const lista = document.getElementById('lista-reservas');
  lista.innerHTML = '';

  if (!reservas || reservas.length === 0) {
    lista.innerHTML = '<p class="painel-sub">Nenhuma reserva encontrada.</p>';
    return;
  }

  for (const r of reservas) {
    const nomeQuadra = await resolverNomeQuadra(r.quadra);
    const cliente    = await resolverNomeCliente(r.cliente ?? r.usuario);
    const data       = formatarData(r.data);
    const duracao    = calcularDuracao(r.inicio, r.fim);
    const situacao   = r.situacao ? capitalizar(r.situacao) : null;
    const valor      = formatarValor(r.valor);

    const busca = `${cliente} ${nomeQuadra}`.toLowerCase();

    const row = document.createElement('div');
    row.className = 'reserva-row';
    row.dataset.busca = busca;
    row.innerHTML = `
      <div class="reserva-info">
        <span class="reserva-nome">${nomeQuadra}</span>
        <div class="reserva-det mt-1">
          Cliente: ${cliente} &nbsp;|&nbsp; Data: ${data}
          &nbsp;|&nbsp; Horário: ${r.inicio ?? '—'} - ${r.fim ?? '—'} (${duracao})
          &nbsp;|&nbsp; Valor: ${valor}
          ${situacao ? `&nbsp;|&nbsp; Situação: ${situacao}` : ''}
        </div>
      </div>
    `;
    lista.appendChild(row);
  }
}

function formatarValor(valor) {
  const num = Number(valor);
  if (Number.isNaN(num)) return '—';
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* Resolve o nome da quadra a partir do objeto embutido na reserva.
   Se a API só mandar o id (ex: { id: 1 }), busca em /quadras/{id} e guarda em cache. */
async function resolverNomeQuadra(quadraRef) {
  if (!quadraRef) return 'Quadra';
  if (quadraRef.nome) return quadraRef.nome;

  const id = quadraRef.id;
  if (!id) return 'Quadra';
  if (cacheQuadras.has(id)) return cacheQuadras.get(id);

  try {
    const resp = await fetch(`${API_BASE}/quadras/${id}`);
    if (!resp.ok) throw new Error(`Erro ${resp.status}`);
    const quadra = await resp.json();
    cacheQuadras.set(id, quadra.nome ?? 'Quadra');
    return quadra.nome ?? 'Quadra';
  } catch (err) {
    console.error(`Erro ao buscar quadra ${id}:`, err);
    return 'Quadra';
  }
}

/* Resolve o nome do cliente. Hoje o /reservas do seu Postman não manda
   nenhuma referência de cliente — então isso só funciona quando a API
   passar a devolver, por exemplo, { "cliente": { "id": X } } (ou "usuario").
   Ajuste CLIENTE_ENDPOINT lá em cima conforme o endpoint real da sua API. */
async function resolverNomeCliente(clienteRef) {
  if (!clienteRef) return '—';
  if (clienteRef.nome) return clienteRef.nome;

  const id = clienteRef.id;
  if (!id) return '—';
  if (cacheClientes.has(id)) return cacheClientes.get(id);

  try {
    const resp = await fetch(`${API_BASE}${CLIENTE_ENDPOINT}/${id}`);
    if (!resp.ok) throw new Error(`Erro ${resp.status}`);
    const cliente = await resp.json();
    const nome = cliente.nome ?? '—';
    cacheClientes.set(id, nome);
    return nome;
  } catch (err) {
    console.error(`Erro ao buscar cliente ${id}:`, err);
    return '—';
  }
}

function calcularDuracao(inicio, fim) {
  if (!inicio || !fim) return '—';
  const [hi, mi] = inicio.split(':').map(Number);
  const [hf, mf] = fim.split(':').map(Number);
  if ([hi, mi, hf, mf].some(Number.isNaN)) return '—';
  const minutos = (hf * 60 + mf) - (hi * 60 + mi);
  if (minutos <= 0) return '—';
  const horas = minutos / 60;
  return `${horas % 1 === 0 ? horas : horas.toFixed(1)}h`;
}

function formatarData(valor) {
  if (!valor) return '—';
  const d = new Date(`${valor}T00:00:00`);
  if (isNaN(d)) return valor;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function capitalizar(texto) {
  const t = String(texto).toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/* ============ QUADRAS: BUSCAR NA API ============ */
async function carregarQuadras() {
  const container = document.getElementById('lista-quadras');
  container.innerHTML = '<p class="painel-sub">Carregando quadras...</p>';

  try {
    const resp = await fetch(`${API_BASE}/quadras`);
    if (!resp.ok) throw new Error(`Erro ${resp.status}`);
    const quadras = await resp.json();
    renderizarQuadras(quadras);
  } catch (err) {
    console.error('Erro ao carregar quadras:', err);
    container.innerHTML = '<p class="painel-sub">Não foi possível carregar as quadras. Verifique se a API está rodando em ' + API_BASE + '.</p>';
  }
}

function renderizarQuadras(quadras) {
  const container = document.getElementById('lista-quadras');
  container.innerHTML = '';

  if (!quadras || quadras.length === 0) {
    container.innerHTML = '<p class="painel-sub">Nenhuma quadra cadastrada ainda. Clique em "Nova quadra" para adicionar.</p>';
    return;
  }

  quadras.forEach(q => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    col.innerHTML = `
      <div class="quadra-card">
        <div class="d-flex justify-content-between align-items-center">
          <h5>${q.nome}</h5>
          <span class="${q.ativa === false ? 'estado-inativa' : 'estado-ativa'}">${q.ativa === false ? 'Inativa' : 'Ativa'}</span>
        </div>
        <div class="quadra-info"> Esporte: ${q.esporte ?? '—'} | Capacidade: ${q.qtdJogadores ?? '—'} jogadores</div>
        <div class="quadra-info"> Horário: ${q.horaAbertura ?? '—'} - ${q.horaFechamento ?? '—'} | R$${Number(q.precoPorHora ?? 0).toFixed(2)}/h</div>
      </div>
    `;
    container.appendChild(col);
  });
}

/* ============ FORMULÁRIO NOVA QUADRA (inline, sem modal) ============ */
function abrirFormQuadra() {
  document.getElementById('form-quadra-wrapper').style.display = 'block';
  document.getElementById('btn-nova-quadra').style.display = 'none';
  document.getElementById('form-quadra-wrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });

  carregarEstados('q-uf');
}

function fecharFormQuadra() {
  document.getElementById('form-quadra-wrapper').style.display = 'none';
  document.getElementById('btn-nova-quadra').style.display = 'inline-flex';
  document.getElementById('form-quadra').reset();

  const citySelect = document.getElementById('q-cidade');
  citySelect.innerHTML = '<option value="">Selecione um estado</option>';
  citySelect.disabled = true;
}

/* ============ ESTADO / CIDADE (BrasilAPI) ============
   Genérico: serve tanto pro formulário de "Nova quadra" (q-uf / q-cidade)
   quanto pro cadastro de proprietário (estado / cidade). Basta passar o
   id do <select> de estado (e, na cidade, o id do <select> de cidade). */

/* Carrega a lista de estados (UF) num <select> a partir do id passado.
   Usa select.dataset.carregado como flag pra não buscar de novo se
   esse select específico já foi preenchido antes. */
async function carregarEstados(selectId) {
  const select = document.getElementById(selectId);
  if (!select || select.dataset.carregado) return;

  try {
    const resp = await fetch('https://brasilapi.com.br/api/ibge/uf/v1');
    const data = await resp.json();

    select.innerHTML = '<option value="">Selecione um estado</option>';
    data
      .sort((a, b) => a.sigla.localeCompare(b.sigla))
      .forEach(uf => {
        const opt = document.createElement('option');
        opt.value = uf.sigla;
        opt.textContent = `${uf.nome} (${uf.sigla})`;
        select.appendChild(opt);
      });

    select.dataset.carregado = 'true';
  } catch (err) {
    console.error('Erro ao carregar estados:', err);
    select.innerHTML = '<option value="">Erro ao carregar estados</option>';
  }
}

/* Carrega as cidades de uma UF num <select> de cidade a partir do id passado. */
async function carregarCidades(uf, citySelectId) {
  const citySelect = document.getElementById(citySelectId);
  if (!citySelect) return;

  if (!uf) {
    citySelect.innerHTML = '<option value="">Selecione um estado</option>';
    citySelect.disabled = true;
    return;
  }

  citySelect.innerHTML = '<option value="">Carregando...</option>';
  citySelect.disabled = true;

  try {
    const resp = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`);
    const cidades = await resp.json();
    citySelect.innerHTML = '<option value="">Selecione uma cidade</option>';
    cidades.forEach(cidade => {
      const opt = document.createElement('option');
      opt.value = cidade.nome;
      opt.textContent = cidade.nome;
      citySelect.appendChild(opt);
    });
    citySelect.disabled = false;
  } catch (err) {
    console.error('Erro ao carregar cidades:', err);
    citySelect.innerHTML = '<option value="">Erro ao carregar</option>';
    citySelect.disabled = false;
  }
}

// Listener único cuidando dos dois pares uf/cidade: o do formulário de
// quadra (q-uf / q-cidade) e o do cadastro de proprietário (estado / cidade).
document.addEventListener('change', function (e) {
  if (!e.target) return;
  if (e.target.id === 'q-uf') carregarCidades(e.target.value, 'q-cidade');
  if (e.target.id === 'estado') carregarCidades(e.target.value, 'cidade');
});

/* ============ QUADRAS: SALVAR NOVA ============ */
async function salvarQuadra(event) {
  event.preventDefault();

  if (!proprietarioId) {
    alert('Sessão expirada. Faça login novamente.');
    mostrarAuth();
    return;
  }

  const fotosTexto = document.getElementById('q-fotos').value.trim();
  const fotos = fotosTexto
    ? fotosTexto.split(',').map(f => f.trim()).filter(Boolean)
    : [];

  const quadra = {
    nome: document.getElementById('q-nome').value,
    esporte: document.getElementById('q-esporte').value,
    qtdJogadores: Number(document.getElementById('q-qtdjogadores').value),
    precoPorHora: Number(document.getElementById('q-precohora').value),
    comprimento: Number(document.getElementById('q-comprimento').value),
    largura: Number(document.getElementById('q-largura').value),
    horaAbertura: document.getElementById('q-horaabertura').value + ':00',
    horaFechamento: document.getElementById('q-horafechamento').value + ':00',
    cep: document.getElementById('q-cep').value,
    rua: document.getElementById('q-rua').value,
    numero: Number(document.getElementById('q-numero').value),
    descricao: document.getElementById('q-descricao').value,
    fotos: fotos,
    proprietario: { id: proprietarioId },
    /* ATENÇÃO: o campo "estado" já é usado pela API pra status da quadra
       (ex: "DISPONIVEL"), então mandei o estado/cidade geográficos com
       nomes diferentes (uf/cidade) pra não colidir. Confirme com o backend
       se são esses os nomes que ele espera — se forem outros, é só trocar
       as duas chaves abaixo. */
    uf: document.getElementById('q-uf').value,
    cidade: document.getElementById('q-cidade').value
  };

  const form = event.target;
  const botao = form.querySelector('button[type="submit"]');
  const textoOriginal = botao.textContent;
  botao.disabled = true;
  botao.textContent = 'Salvando...';

  try {
    const resp = await fetch(`${API_BASE}/quadras`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quadra)
    });

    if (!resp.ok) {
      const corpoErro = await resp.text().catch(() => '');
      throw new Error(`Erro ${resp.status}: ${corpoErro}`);
    }

    fecharFormQuadra();
    carregarQuadras();
  } catch (err) {
    console.error('Erro ao salvar quadra:', err);
    alert('Não foi possível salvar a quadra. Verifique o console para detalhes e confirme se a API está rodando em ' + API_BASE + '.');
  } finally {
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
}

/* ============ INICIALIZAÇÃO ============ */
document.addEventListener('DOMContentLoaded', () => {
  const idSalvo = localStorage.getItem('proprietarioId');

  if (idSalvo) {
    // já tinha logado antes (F5 na página, por exemplo): pula direto pro app
    proprietarioId = idSalvo;
    mostrarApp();
  } else {
    // ninguém logado: mostra só a tela de autenticação
    mostrarAuth();
  }
});