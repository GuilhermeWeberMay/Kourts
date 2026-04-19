package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime inicio;

    @Column(nullable = false)
    private LocalTime fim;

    @Column(nullable = false)
//    @Setter(AccessLevel.NONE)
    private BigDecimal valor;

    @Column(nullable = false)
    private Situacao situacao;

    @ManyToOne
    private Quadra quadra;

    public BigDecimal getValor() {
        return calcularValor();
    }

    public BigDecimal calcularValor() {
        if (quadra.getPrecoPorHora() == null) {
            throw new RuntimeException("Preço por hora da quadra não informado");
        }

        Duration duracao = Duration.between(inicio, fim);
        long minutos = duracao.toMinutes();

        BigDecimal horas = BigDecimal.valueOf(minutos)
                .divide(BigDecimal.valueOf(60));

        BigDecimal valor = quadra.getPrecoPorHora().multiply(horas);

        return this.valor;
    }
}
