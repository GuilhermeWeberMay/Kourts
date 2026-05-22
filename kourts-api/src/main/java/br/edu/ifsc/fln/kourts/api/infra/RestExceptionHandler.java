package br.edu.ifsc.fln.kourts.api.infra;

import br.edu.ifsc.fln.kourts.api.model.domain.InfoRepitida;
import br.edu.ifsc.fln.kourts.api.model.domain.InfoRepitidaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLException;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    private ResponseEntity<RestErrorMessage> handleException(InfoRepitida ex) {
        RestErrorMessage jsonErro =  new RestErrorMessage(HttpStatus.BAD_REQUEST,ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonErro);
    }

    //IllegalArgumentException
}

