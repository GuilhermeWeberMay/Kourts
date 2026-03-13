package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
public class Jogador extends Usuario{
    @Column(nullable = false, length = 30, unique = true)
    private String apelido;
    @Column(nullable = false, columnDefinition = "CHAR(11)", unique = true)
    private String cpf;
    @Column(nullable = false, length = 64)
    private String sobrenome;
}
