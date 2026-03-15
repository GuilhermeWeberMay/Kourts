<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title> Pagina Funcionario </title>
</head>

<body>
 <h3> Pagina para manipular funcionarios </h3>

 <fieldset>
  <legend>Cadastro de Funcionários (POST) </legend>

  <form action="paginaFuncionario.php" method="post">

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

   <button type="submit" name="post">Cadastrar</button>
  </form>
  <?php
  require 'Funcionario.php';
  if (isset($_POST['post'])) {
   $funcionario = new Funcionario();
   $formNome = $_POST['nome'];
   $formSenha = $_POST['senha'];
   $formSobrenome = $_POST['sobrenome'];
   $formEmail = $_POST['email'];
   $formCpf = $_POST['cpf'];
   $formTelefone = $_POST['telefone'];
   $funcionario->post($formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone);
  }
  ?>
 </fieldset>

 <fieldset>
  <legend>Deletar Funcionário (DELETE) </legend>

  <form action="paginaFuncionario.php" method="post">

   <label for="id">Id:</label>
   <input type="text" id="id" name="id" require><br><br>

   <button type="submit" name="delete">Deletar</button>
  </form>
  <?php
  if (isset($_POST['delete'])) {
   $funcionario = new Funcionario();
   $formId = $_POST['id'];
   $funcionario->delete($formId);
  }
  ?>
 </fieldset>

 <fieldset>
  <legend>Atualizar Funcionário (PUT) </legend>
  <form action="paginaFuncionario.php" method="post">

   <label for="id">Id:</label>
   <input type="text" id="id" name="id" require><br><br>

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

   <button type="submit" name="put">Cadastrar</button>
  </form>
  <?php
  if (isset($_POST['put'])) {
   $funcionario = new Funcionario();
   $formId = $_POST['id'];
   $formNome = $_POST['nome'];
   $formSenha = $_POST['senha'];
   $formSobrenome = $_POST['sobrenome'];
   $formEmail = $_POST['email'];
   $formCpf = $_POST['cpf'];
   $formTelefone = $_POST['telefone'];
   $funcionario->put($formId, $formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone);
  }
  ?>
 </fieldset>

 <fieldset>
  <legend>Listar Funcionários (GET) </legend>

  <form action="paginaFuncionario.php" method="post">

   <button type="submit" name="get">Listar</button>
  </form>
  <?php
  if (isset($_POST['get'])) {
   $funcionario = new Funcionario();
   $funcionario->get();
  }
  ?>
 </fieldset>

  </body>
</html>