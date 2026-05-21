package br.edu.ifsc.fln.kourts.api.erros;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManipuladorDeExcecoes {

    // Tratamento para uma exceção de negócio personalizada
    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<RegraNegocioException> tratarRegraNegocio(RegraNegocioException ex) {
        RegraNegocioException erro = new RegraNegocioException(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // Tratamento genérico para erros inesperados
    @ExceptionHandler(Exception.class)
    public ResponseEntity<RegraNegocioException> tratarErroGenerico(Exception ex) {
        RegraNegocioException erro = new RegraNegocioException(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Ocorreu um erro interno no servidor.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
    }
}

