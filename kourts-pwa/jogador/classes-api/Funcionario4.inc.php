<?php
// URL da API com o ID do recurso a ser deletado
$url = 'http://localhost:8081/kourts.com.br/deleteFuncionario/152';

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
 echo "Recurso deletado com sucesso.";
} else {
 echo "Erro ao deletar. Código: " . $httpCode;
}