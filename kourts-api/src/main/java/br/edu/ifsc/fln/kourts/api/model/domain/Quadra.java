package br.edu.ifsc.fln.kourts.api.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import lombok.*;

import java.math.BigDecimal;

import java.time.Duration;
import java.time.LocalTime;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Entity
public class Quadra {
    /*
    unique - não pode repetir
    nullable - não pode ser null
    length - tamanho
    columnDefinition - tipo de dado
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 64)
    private String nome;

    @Column(nullable = false, length = 32)
    private String tipoEsporte;

    @Column(nullable = false)
    private List<String> fotos = new ArrayList<>();

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private int numero;

    @Column(nullable = false, columnDefinition = "CHAR(8)")
    private String cep;

    @Column(nullable = false)
    private int qtdJogadores;

    @Column(nullable = false)
    private BigDecimal precoPorHora;

    @Column(nullable = false)
    private float largura;

    @Column(nullable = false)
    private float comprimento;

    @Column(nullable = false)
    private LocalTime horaAbertura;

    @Column(nullable = false)
    private LocalTime horaFechamento;

    @Enumerated(EnumType.STRING)
    private Estado estado = Estado.DISPONIVEL;

    // Relacionamento MultiDirecional com Proprietario
    @JsonIgnore
    @ManyToOne
    private Proprietario proprietario;

    public void validarHorario(Reserva reserva, Quadra quadra) {
        if (reserva.getInicio().getMinute() != 0 || reserva.getFim().getMinute() != 0) {
            throw new RuntimeException("A reserva só pode ser feita em horários cheios");
        }

        Duration duracao = Duration.between(reserva.getInicio(), reserva.getFim());

        if (duracao.toMinutes() < 60) {
            throw new RuntimeException("A reserva deve ter no mínimo 1 hora");
        }

        if (duracao.toMinutes() % 60 != 0) {
            throw new RuntimeException("A reserva deve ter duração em blocos de 1 hora");
        }

        if (reserva.getInicio().isBefore(quadra.getHoraAbertura())) {
            throw new RuntimeException("Horário de início fora do funcionamento da quadra");
        }

        if (reserva.getFim().isAfter(quadra.getHoraFechamento())) {
            throw new RuntimeException("Horário de fim fora do funcionamento da quadra");
        }
    }
}
