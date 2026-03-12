package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok
@Getter // Métodos getters
@Setter // Métodos setters
@NoArgsConstructor // Faz um construtor sem nenhum atributo - é necessário isso para o spring funcionar
@EqualsAndHashCode(callSuper = true) // Métodos Equals e Hash Code
@Entity // Fala que esta classe será uma entidade no banco
public class Funcionario extends Usuario {
    /*
    unique - não pode repetir
    nullable - não pode ser null
    length - tamanho
    columnDefinition - tipo de dado
    */

    @Column(nullable = false, length = 64)
    private String sobrenome;

    @Column(nullable = false, columnDefinition = "CHAR(11)", unique = true)
    private String cpf;
}
