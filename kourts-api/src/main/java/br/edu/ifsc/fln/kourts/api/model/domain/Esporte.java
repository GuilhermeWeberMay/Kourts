package br.edu.ifsc.fln.kourts.api.model.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Esporte {
    FUTSAL("Disponivel"),
    FUTEBOL("Indisponivel"),
    FUT7("Fut7"),
    VOLEI("Vôlei"),
    VOLEI_AREIA("Vôlei de areia"),
    BEACH_TENIS("Beach Tenis"),
    TENIS("Tênis"),
    FUTVOLEI("Futvolei");

    private String descricao;
}