<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title> Teste post API </title>
</head>

<body>
 <!-- Fazendo um formulario para cadastrar as informações: nome, senha, sobrenome, email, cpf e telefone -->
 <form action="cadastro.php" method="post">

  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" require><br><br>
  
  <label for="senha">Senha:</label>
  <input type="password" id="senha" name="senha" require><br><br>
  
  <label for="sobrenome">Sobrenome:</label>
  <input type="text" id="sobrenome" name="sobrenome" require><br><br>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" require><br><br>
  
  <label for="cpf">CPF:</label>
  <input type="text" id="cpf" name="cpf" require><br><br>
  
  <label for="telefone">Telefone:</label>
  <input type="text" id="telefone" name="telefone" require><br><br>
  
  <button type="submit" name="botao">Cadastrar</button>
 </form>
 <?php
 require 'Jogador.php';
 if (isset($_POST['botao'])) {
  $jogador = new Jogador();
  $formNome = $_POST['nome'];
  $formSenha = $_POST['senha'];
  $formSobrenome = $_POST['sobrenome'];
  $formEmail = $_POST['email'];
  $formCpf = $_POST['cpf'];
  $formTelefone = $_POST['telefone'];
  $jogador->get($formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone);
 }
 ?>
</body>

</html>