<?php
// 1. Receber a resposta da API (ex: via cURL)
$jsonResponse = file_get_contents('http://localhost:8081/kourts.com.br/Funcionario/152');

// 2. Converter o JSON para um Objeto PHP
$funcionario = json_decode($jsonResponse);

// 3. Acessar as propriedades do objeto
// Exibindo a foto e nao o link para a foto

echo "<p> Nome: " . $funcionario->nome . "</p>";
echo "<p> Nome: " . $funcionario->senha . "</p>"; 
echo "<p> id: " . $funcionario->sobrenome . "</p>"; 
echo "<p> senha: ". $funcionario->email . "</p>"; 
echo "<p> telefone: ". $funcionario->cpf . "</p>"; 
echo "<p> cpf: ". $funcionario->telefone . "</p>"; 
?>