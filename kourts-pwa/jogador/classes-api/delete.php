<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
</head>

<body>
 <form action="delete.php" method="post">

  <label for="id">Id:</label>
  <input type="text" id="id" name="id" require><br><br>

  <button type="submit" name="botao">Cadastrar</button>

 </form>
 <?php
 require 'Funcionario.php';

 if (isset($_POST['botao'])) {
  $funcionario = new Funcionario();
  $formId = $_POST['id'];
 
  $funcionario->delete($formId);
 }

 ?>
</body>

</html>