package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
// Jakarta
@Embeddable
public class Local {
    /*
    unique - não pode repetir
    nullable - não pode ser null
    length - tamanho
    columnDefinition - tipo de dado
    */

    @Column(nullable = false, length = 64)
    private String bairro;
    @Column(nullable = false, length = 64)
    private String estado;
    @Column(nullable = false, length = 64)
    private String cidade;
}
