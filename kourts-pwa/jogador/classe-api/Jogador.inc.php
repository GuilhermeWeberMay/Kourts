<?php
class Jogador
{

 public function post($formNome, $formEmail, $formSenha, $formTelefone, $formApelido, $formCpf, $formSobrenome, $formBairro, $formEstado, $formCidade)
 {
  $jogador = [
   "nome" => $formNome,
   "email" => $formEmail,
   "senha" => $formSenha,
   "telefone" => $formTelefone,
   "apelido" => $formApelido,
   "cpf" => $formCpf,
   "sobrenome" => $formSobrenome,
   "local" => [
    "bairro" => $formBairro,
    "estado" => $formEstado,
    "cidade" => $formCidade
   ]
  ];

  $json = json_encode($jogador);

  $url = 'http://localhost:8081/kourts.com.br/create/Jogador';

  $ch = curl_init($url);

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
   'Content-Type: application/json',
   'Content-Length: ' . strlen($json)
  ));

  $resposta = curl_exec($ch);

  echo $resposta . " - Jogador cadastrado com sucesso!";
 }
}
