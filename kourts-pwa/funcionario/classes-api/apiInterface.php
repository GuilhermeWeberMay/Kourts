<?php
interface apiInterface{
 public function post($formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone);
 public function get();
 public function put($formId, $formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone);
 public function delete($formId);
}
?>