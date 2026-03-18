<!DOCTYPE html>
<html lang="pt-BR">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
 <style>
  form {
   display: inline-block;
  }

  button {
   width: 200px;
   height: 50px;
   font-size: 18px;
   margin: 10px;
   cursor: pointer;
   background-color: #4CAF50;
   color: white;
   border: none;
   border-radius: 5px;
  }
 </style>
</head>

<body>
 <h1> Página para manipular Jogadores</h1>

 <form action="getJogador.php">
  <button> Métodos GET </button>
 </form>

 <form action="postJogador.php">
  <button> Métodos POST </button>
 </form>

 <form action="putJogador.php">
  <button> Métodos PUT </button>
 </form>

 <form action="deleteJogador.php">
  <button> Métodos DELETE </button>
 </form>

</body>

</html>