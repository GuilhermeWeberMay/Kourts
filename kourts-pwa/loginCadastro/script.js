 
  document.addEventListener('DOMContentLoaded', () => {
   mudaBt('login');
  });

  //troca de aba
  function mudaBt(tela){
    const formularios = document.getElementsByClassName('formulario');
    Array.from(formularios).forEach(f => f.classList.remove('show'));

    const btnLogin    = document.getElementById('btn-login');
    const btnCadastro = document.getElementById('btn-cadastro');
    const card        = document.querySelector('.card');

    if(tela === 'login')
    {
     document.getElementById('formulario-login').classList.add('show');
     btnLogin.classList.add('ativo');
     btnCadastro.classList.remove('ativo');
     card.style.maxWidth = '460px';
    }
    else {
      document.getElementById('formulario-cadastro').classList.add('show');
      btnCadastro.classList.add('ativo');
      btnLogin.classList.remove('ativo');
      card.style.maxWidth = '600px';
    }

    limparErros();
  }
  
/*  function redirecionarPorRole(role){
    if(role === 'proprietario')
    {
     window.location.href = '../proprietario/spa/telaReservas.html#';
    }
    else{
     window.location.href = '../jogador/spa/index.html#';
    }
  }*/
