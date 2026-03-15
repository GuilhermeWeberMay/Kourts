package br.edu.ifsc.fln.kourts.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {

    @GetMapping("kourts.com.br")
    public String kourts() {
        return "Kourts o melhor app para aluguel de quadras do mundo!";
    }

}
