<?php
require 'apiInterface.php';
class Jogador implements apiInterface
{

 public function get($formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone)
 {
  $jogador = [
   "nome" => $formNome,
   "senha" => $formSenha,
   "sobrenome" => $formSobrenome,
   "email" => $formEmail,
   "cpf" => $formCpf,
   "telefone" => $formTelefone
  ];

  $json = json_encode($jogador);

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

  echo $resposta . " - Jogador cadastrado com sucesso!";
 }

 public function post() {}
 public function put() {}

 public function delete($formId)
 {
  // URL da API com o ID do recurso a ser deletado
  $url = 'http://localhost:8081/kourts.com.br/deleteFuncionario/' . $formId;

  // Inicia o cURL
  $ch = curl_init($url);

  // Configura as opções
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');

  // Executa a requisição
  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); // Obtém o código de status HTTP

  // Trata a resposta
  if ($httpCode == 200 || $httpCode == 204) {
   echo "Jogador deletado com sucesso.";
  } else {
   echo "Erro ao deletar. Código: " . $httpCode;
  }
 }
}
