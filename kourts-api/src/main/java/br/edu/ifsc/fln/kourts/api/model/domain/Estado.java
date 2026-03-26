package br.edu.ifsc.fln.kourts.api.model.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public enum Estado {
    DISPONIVEL("Disponivel"), INDISPONIVEL("Indisponivel");

    private String descricao;
}
