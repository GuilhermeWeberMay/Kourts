<?php
class Jogador
{
 // Create
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

  $url = 'http://localhost:8081/jogadores';

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

 // Read
 public function getAll()
 {
  // 1. Receber a resposta da API (ex: via cURL)
  $jsonResponse = file_get_contents('http://localhost:8081/jogadores');

  // 2. Converter o JSON para um Objeto PHP
  $jogador = json_decode($jsonResponse);

  // 3. Acessar as propriedades do objeto
  if ($jsonResponse == null) {
   echo "<h1> Erro </h1>";
  } else {
   foreach ($jogador as $jog) {
    echo "<p> Id: " . $jog->id . "</p>";
    echo  "<p> Nome: " . $jog->nome . "</p>";
    echo "<p> Email: " . $jog->email . "</p>";
    echo "<p> Senha: " . $jog->senha . "</p>";
    echo "<p> Telefone: " . $jog->telefone . "</p>";
    echo "<p> Apelido: " . $jog->apelido . "</p>";
    echo "<p> CPF: " . $jog->cpf . "</p>";
    echo "<p> Sobrenome: " . $jog->sobrenome . "</p>";
    echo "<p> Bairro: " . $jog->local->bairro . "</p>";
    echo "<p> Estado: " . $jog->local->estado . "</p>";
    echo "<p> Cidade: " . $jog->local->cidade . "</p>";
    echo "<hr>";
   }
  }
 }

 public function getId($inputId)
 {
  // 1. Receber a resposta da API (ex: via cURL)
  $jsonResponse = file_get_contents('http://localhost:8081/jogadores/id/' . $inputId);

  // 2. Converter o JSON para um Objeto PHP
  $jogador = json_decode($jsonResponse);

  // 3. Acessar as propriedades do objeto
  echo "<p> Id: " . $jogador->id . "</p>";
  echo  "<p> Nome: " . $jogador->nome . "</p>";
  echo "<p> Email: " . $jogador->email . "</p>";
  echo "<p> Senha: " . $jogador->senha . "</p>";
  echo "<p> Telefone: " . $jogador->telefone . "</p>";
  echo "<p> Apelido: " . $jogador->apelido . "</p>";
  echo "<p> CPF: " . $jogador->cpf . "</p>";
  echo "<p> Sobrenome: " . $jogador->sobrenome . "</p>";
  echo "<p> Bairro: " . $jogador->local->bairro . "</p>";
  echo "<p> Estado: " . $jogador->local->estado . "</p>";
  echo "<p> Cidade: " . $jogador->local->cidade . "</p>";
 }

 public function getCpf($inputCpf)
 {
  // 1. Receber a resposta da API (ex: via cURL)
  $jsonResponse = file_get_contents('http://localhost:8081/jogadores/cpf/' . $inputCpf);

  // 2. Converter o JSON para um Objeto PHP
  $jogador = json_decode($jsonResponse);

  // 3. Acessar as propriedades do objeto
  echo "<p> Id: " . $jogador->id . "</p>";
  echo  "<p> Nome: " . $jogador->nome . "</p>";
  echo "<p> Email: " . $jogador->email . "</p>";
  echo "<p> Senha: " . $jogador->senha . "</p>";
  echo "<p> Telefone: " . $jogador->telefone . "</p>";
  echo "<p> Apelido: " . $jogador->apelido . "</p>";
  echo "<p> CPF: " . $jogador->cpf . "</p>";
  echo "<p> Sobrenome: " . $jogador->sobrenome . "</p>";
  echo "<p> Bairro: " . $jogador->local->bairro . "</p>";
  echo "<p> Estado: " . $jogador->local->estado . "</p>";
  echo "<p> Cidade: " . $jogador->local->cidade . "</p>";
 }

 public function getApelido($inputApelido)
 {
  // 1. Receber a resposta da API (ex: via cURL)
  $jsonResponse = file_get_contents('http://localhost:8081/jogadores/apelido/' . $inputApelido);

  // 2. Converter o JSON para um Objeto PHP
  $jogador = json_decode($jsonResponse);

  // 3. Acessar as propriedades do objeto
  echo "<p> Id: " . $jogador->id . "</p>";
  echo  "<p> Nome: " . $jogador->nome . "</p>";
  echo "<p> Email: " . $jogador->email . "</p>";
  echo "<p> Senha: " . $jogador->senha . "</p>";
  echo "<p> Telefone: " . $jogador->telefone . "</p>";
  echo "<p> Apelido: " . $jogador->apelido . "</p>";
  echo "<p> CPF: " . $jogador->cpf . "</p>";
  echo "<p> Sobrenome: " . $jogador->sobrenome . "</p>";
  echo "<p> Bairro: " . $jogador->local->bairro . "</p>";
  echo "<p> Estado: " . $jogador->local->estado . "</p>";
  echo "<p> Cidade: " . $jogador->local->cidade . "</p>";
 }

 // Update
 public function put($formNome, $formEmail, $formSenha, $formTelefone, $formApelido, $formCpf, $formSobrenome, $formBairro, $formEstado, $formCidade)
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
  $url = 'http://localhost:8081/jogadores/cpf/' . $formCpf;

  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); // Define o verbo PUT
  curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
   'Content-Type: application/json',
   'Content-Length: ' . strlen($json)
  ]);

  $resposta = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  // Validação do status de sucesso da API
  if ($httpCode >= 200 && $httpCode < 300) {
   echo "Jogador atualizado com sucesso!";
  } else {
   echo "Erro ao atualizar: " . $resposta . " (Código: $httpCode)";
  }
 }

 // Delete
 public function deleteId($formId)
 {
  // URL da API com o ID do recurso a ser deletado
  $url = 'http://localhost:8081/jogadores/id/' . $formId;

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

 public function deleteCpf($formCpf)
 {
  // URL da API com o ID do recurso a ser deletado
  $url = 'http://localhost:8081/jogadores/cpf/' . $formCpf;

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

 public function deleteApelido($formApelido)
 {
  // URL da API com o ID do recurso a ser deletado
  $url = 'http://localhost:8081/jogadores/apelido/' . $formApelido;

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
