package br.edu.ifsc.fln.kourts.api.infra;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

//    @ExceptionHandler
//    private ResponseEntity<RestErrorMessage> handleException(InfoRepitida ex) {
//        RestErrorMessage jsonErro =  new RestErrorMessage(HttpStatus.BAD_REQUEST,ex.getMessage());
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonErro);
//    }

    //IllegalArgumentException
}

