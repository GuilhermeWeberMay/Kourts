package br.edu.ifsc.fln.kourts.api.model.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Enumerated(EnumType.STRING)
    private Esporte esporte;

    @ElementCollection
    @CollectionTable(
            name = "horarios_disponiveis",
            joinColumns = @JoinColumn(name = "quadra_id")
    )
    private List<LocalTime> horariosDisponiveis = new ArrayList<>();

    // Relacionamento MultiDirecional com Proprietario
    @ManyToOne
    @JsonBackReference
    private Proprietario proprietario;

    public void gerarHorariosDisponiveis() {
        this.horariosDisponiveis = new ArrayList<>();
        LocalTime atual = this.horaAbertura;

        while (atual.isBefore(this.horaFechamento)) {
            this.horariosDisponiveis.add(atual);
            atual = atual.plusHours(1);
        }
    }



}
