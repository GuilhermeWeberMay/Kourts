<?php
// 1. Receber a resposta da API (ex: via cURL)
$jsonResponse = file_get_contents('http://localhost:8081/kourts.com.br/Funcionario/256');

// 2. Converter o JSON para um Objeto PHP
$funcionario = json_decode($jsonResponse);

// 3. Acessar as propriedades do objeto
// Exibindo a foto e nao o link para a foto
if($jsonResponse == null){
 echo "<h1> Erro </h1>";
}else{
echo "<p> Nome: " . $funcionario->nome . "</p>";
echo "<p> Senha: " . $funcionario->senha . "</p>"; 
echo "<p> Sobrenome: " . $funcionario->sobrenome . "</p>"; 
echo "<p> Email: ". $funcionario->email . "</p>"; 
echo "<p> CPF: ". $funcionario->cpf . "</p>"; 
echo "<p> Telefone: ". $funcionario->telefone . "</p>"; 
echo "<p> Id: ". $funcionario->id . "</p>"; 
}
?>