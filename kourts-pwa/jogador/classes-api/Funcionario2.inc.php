<?php
$funcionario = [
 "nome" => "Pedro",
 "senha" => "123",
 "sobrenome" => "Parker",
 "email" => "pp@gmail.com",
 "cpf" => "33333333333",
 "telefone" => "33333333333"
];

$json = json_encode($funcionario);

$url = 'http://localhost:8081/kourts.com.br/createFuncionario';

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 'Content-Type: application/json',
 'Content-Length: ' . strlen($json)
));

$resposta = curl_exec($ch);

echo $resposta;