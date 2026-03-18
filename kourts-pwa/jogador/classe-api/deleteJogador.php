<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title> DELETE Jogador</title>
</head>
<body>
 <h1>DELETE JOGADOR </h1>

 <fieldset>
  <legend> Deletar Jogador (Id) </legend>
  <form action="deleteJogador.php" method="post">
   <label for="id">Id:</label>
   <input type="text" id="id" name="id" require><br><br>

   <button type="submit" name="deleteId"> Deletar </button>
  </form>
  <?php
  require 'Jogador.inc.php';
  if (isset($_POST['deleteId'])) {
   $jogador = new Jogador();
   $jogador->deleteId($_POST['id']);
  }
  ?>
 </fieldset>

 <fieldset>
  <legend> Deletar Jogador (CPF) </legend>
  <form action="deleteJogador.php" method="post">
   <label for="cpf">CPF:</label>
   <input type="text" id="cpf" name="cpf" require><br><br>

   <button type="submit" name="deleteCpf"> Deletar </button>
  </form>
  <?php
  if (isset($_POST['deleteCpf'])) {
   $jogador = new Jogador();
   $jogador->deleteCpf($_POST['cpf']);
  }
  ?>
 </fieldset>

 <fieldset>
  <legend> Deletar Jogador (Apelido) </legend>
  <form action="deleteJogador.php" method="post">
   <label for="apelido">Apelido:</label>
   <input type="text" id="apelido" name="apelido" require><br><br>

   <button type="submit" name="deleteApelido"> Deletar </button>
  </form>
  <?php
  if (isset($_POST['deleteApelido'])) {
   $jogador = new Jogador();
   $jogador->deleteApelido($_POST['apelido']);
  }
  ?>
 </fieldset>
</body>
</html>