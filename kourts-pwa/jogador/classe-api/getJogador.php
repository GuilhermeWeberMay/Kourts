<!DOCTYPE html>
<html lang="pt-BR">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title> GET JOGADOR </title>
</head>
<body>

 <form action="getJogador.php" method="post">
  <button type="submit" name="get"> Get All </button>
 </form>
 <?php
  require 'Jogador.inc.php';
  if (isset($_POST['get'])) {
   $jogador = new Jogador();
   $jogador->getAll();
  }
  ?>

  <form action="getJogador.php" method="post">
  <input type="text" name="id" placeholder="Id do jogador">
  <button type="submit" name="getId"> Get Id </button>
 </form>
 <?php
  if (isset($_POST['getId'])) {
   $jogador = new Jogador();
   $jogador->getId($_POST['id']);
  }
  ?>

  <form action="getJogador.php" method="post">
  <input type="text" name="cpf" placeholder="CPF do jogador">
  <button type="submit" name="getCpf"> Get CPF </button>
 </form>
 <?php
  if (isset($_POST['getCpf'])) {
   $jogador = new Jogador();
   $jogador->getCpf($_POST['cpf']);
  }
  ?>

  <form action="getJogador.php" method="post">
  <input type="text" name="apelido" placeholder="Apelido do jogador">
  <button type="submit" name="getApelido"> Get Apelido </button>
 </form>
 <?php
  if (isset($_POST['getApelido'])) {
   $jogador = new Jogador();
   $jogador->getApelido($_POST['apelido']);
  }
  ?>
</body>
</html>