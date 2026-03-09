package br.edu.ifsc.fln.kourts.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;

@RestController
public class TesteController {

    @GetMapping("kourts.com.br")
    public String kourts() {
        return "Kourts o melhor app para aluguel de quadras do mundo!";
    }

    @GetMapping("kourts.com.br/funcionario")
    public String funcionario() {
        Funcionario funcionario = new Funcionario("gui", "gui@gui", "123", "48", "Weber", "101");

        return funcionario.toString();
    }
}
