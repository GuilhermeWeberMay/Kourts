package br.edu.ifsc.fln.kourts.api.model.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Permissoes {
    JOGADOR("Jogador"), PROPRIETARIO("Propeirtario");

    private String descricao;
}
