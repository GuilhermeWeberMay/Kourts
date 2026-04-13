package br.edu.ifsc.fln.kourts.api.model.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

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
    @ManyToOne
    @JsonBackReference
    private Proprietario proprietario;
}
