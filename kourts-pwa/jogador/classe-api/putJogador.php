<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title> PUT JOGADOR </title>
</head>
<body>
 <form action="putJogador.php" method="post">
  <input type="text" name="formNome" placeholder="Nome">
  <input type="email" name="formEmail" placeholder="Email">
  <input type="password" name="formSenha" placeholder="Senha">
  <input type="tel" name="formTelefone" placeholder="Telefone">
  <input type="text" name="formApelido" placeholder="Apelido">
  <input type="text" name="formCpf" placeholder="CPF">
  <input type="text" name="formSobrenome" placeholder="Sobrenome">
  <input type="text" name="formBairro" placeholder="Bairro">
  <input type="text" name="formEstado" placeholder="Estado">
  <input type="text" name="formCidade" placeholder="Cidade">
  <button type="submit" name="put"> Atualizar </button>
 </form>
 <?php
  require 'Jogador.inc.php';
  if (isset($_POST['put'])) {
   $jogador = new Jogador();
   $formNome = $_POST['formNome'];
   $formEmail = $_POST['formEmail'];
   $formSenha = $_POST['formSenha'];
   $formTelefone = $_POST['formTelefone'];
   $formApelido = $_POST['formApelido'];
   $formCpf = $_POST['formCpf'];
   $formSobrenome = $_POST['formSobrenome'];
   $formBairro = $_POST['formBairro'];
   $formEstado = $_POST['formEstado'];
   $formCidade = $_POST['formCidade'];
   $jogador->put($formNome, $formEmail, $formSenha, $formTelefone, $formApelido, $formCpf, $formSobrenome, $formBairro, $formEstado, $formCidade);
  }
  ?>
</body>
</html>