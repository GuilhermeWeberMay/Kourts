package br.edu.ifsc.fln.kourts.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerTeste {

    @GetMapping("kourts.com.br")
    public String teste(){
        return "O melhor aplicativo para locação de quadras do mundo!";
    }

}
