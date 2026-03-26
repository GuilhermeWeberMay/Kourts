package br.edu.ifsc.fln.kourts.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {

    @GetMapping("kourts.com.br")
    public String kourts() {
//        LocalTime inicio = LocalTime.of(12, 00);
//        LocalTime fim = LocalTime.of(23, 59, 59);
//        Proprietario proprietario = new Proprietario();
//
//        List<String> fotos = new ArrayList<>();
//        fotos.add("https://www.google.com");
//        fotos.add("https://www.amazon.com");
//        Quadra quadra = new Quadra(1, "Trajano 1", "Futebol", fotos, "Rua Jordelino", 300,
//                "88164126", 12,
//                new BigDecimal("150"), 9.99f, 10.5f, inicio, fim, Estado.DISPONIVEL,
//                proprietario);
//
//        Reserva reserva = new Reserva(1, LocalDate.of(2025, 02, 25), LocalTime.of(14, 00),
//                LocalTime.of(15, 00), Situacao.APROVADA, quadra);
//
//        reserva.getValor();
//        return reserva.toString();
        return "Kourts o melhor app para alugar quadras esportivas! ";
    }

}
