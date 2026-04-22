package br.edu.ifsc.fln.kourts.api.dto;

import br.edu.ifsc.fln.kourts.api.model.domain.Esporte;
import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuadraHorariosDTO {

    private Integer id;
    private String nome;
    private String rua;
    private int numero;
    private String cep;
    private int qtdJogadores;
    private BigDecimal precoPorHora;
    private float largura;
    private float comprimento;
    private LocalTime horaAbertura;
    private LocalTime horaFechamento;
    private Map<LocalDate, List<LocalTime>> horariosDisponiveis;
    private Esporte esporte;

//    public QuadraHorariosDTO(Quadra quadra, Map<LocalDate, List<LocalTime>> horariosDisponiveis) {
//        this.id = quadra.getId();
//        this.nome = quadra.getNome();
//        this.precoPorHora = quadra.getPrecoPorHora();
//        this.horariosDisponiveis = horariosDisponiveis;
//    }

    public QuadraHorariosDTO( Quadra quadra, Map<LocalDate, List<LocalTime>> horariosDisponiveis) {
        this.id = quadra.getId();
        this.nome = quadra.getNome();
        this.rua = quadra.getRua();
        this.numero = quadra.getNumero();
        this.cep = quadra.getCep();
        this.qtdJogadores = quadra.getQtdJogadores();
        this.precoPorHora = quadra.getPrecoPorHora();
        this.largura = quadra.getLargura();
        this.comprimento = quadra.getComprimento();
        this.horaAbertura = quadra.getHoraAbertura();
        this.horaFechamento = quadra.getHoraFechamento();
        this.horariosDisponiveis = horariosDisponiveis;
        this.esporte = quadra.getEsporte();
    }
}
