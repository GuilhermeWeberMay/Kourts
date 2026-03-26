package br.edu.ifsc.fln.kourts.api.model.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Situacao {
    PENDENTE("Pendente"),
    CANCELADA("Cancelada"),
    APROVADA("Aprovada"),
    FINALIZADA("Finalizada");

    private String descricao;
}
