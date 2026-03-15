<?php
require 'apiInterface.php';
class Funcionario implements apiInterface
{

 public function post($formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone)
 {
  $funcionario = [
   "nome" => $formNome,
   "senha" => $formSenha,
   "sobrenome" => $formSobrenome,
   "email" => $formEmail,
   "cpf" => $formCpf,
   "telefone" => $formTelefone
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

  echo $resposta . " - Funcionario cadastrado com sucesso!";
 }

 public function get() {}

 public function put($formId, $formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone)
 {
  $funcionario = [
   "id" => $formId,
   "nome" => $formNome,
   "senha" => $formSenha,
   "sobrenome" => $formSobrenome,
   "email" => $formEmail,
   "cpf" => $formCpf,
   "telefone" => $formTelefone
  ];

  $json = json_encode($funcionario);

  $url = 'http://localhost:8081/kourts.com.br/putFuncionario/' . $formId;

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
 }


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
   echo "Funcionario deletado com sucesso.";
  } else {
   echo "Erro ao deletar. Código: " . $httpCode;
  }
 }
}
