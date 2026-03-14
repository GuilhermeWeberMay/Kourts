<?php
interface apiInterface{
 public function post();
 public function get($formNome, $formSenha, $formSobrenome, $formEmail, $formCpf, $formTelefone);
 public function put();
 public function delete($formId);
}
?>