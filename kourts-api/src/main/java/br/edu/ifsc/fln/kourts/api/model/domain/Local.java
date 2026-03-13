package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class Local {
    @Column(nullable = false, length = 64)
    private String bairro;
    @Column(nullable = false, length = 64)
    private String estado;
    @Column(nullable = false, length = 64)
    private String cidade;
}
