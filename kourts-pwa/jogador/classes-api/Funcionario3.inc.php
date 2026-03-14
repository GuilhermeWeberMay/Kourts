<?php
$funcionario = [
 "nome" => "Dudu",
 "senha" => "321",
 "sobrenome" => "Gomes",
 "email" => "dg@gmail.com",
 "cpf" => "44444444444",
 "telefone" => "44444444444"
];

$json = json_encode($funcionario);

$url = 'http://localhost:8081/kourts.com.br/putFuncionario/152';

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 'Content-Type: application/json',
 'Content-Length: ' . strlen($json)
));

$resposta = curl_exec($ch);

if (curl_errno($ch)) {
 echo 'Erro cURL: ' . curl_error($ch);
}

echo $resposta;
