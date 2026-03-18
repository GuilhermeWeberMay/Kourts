package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Lombok
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
// Jakarta
@Entity
public class Proprietario extends Usuario{
    /*
    unique - não pode repetir
    nullable - não pode ser null
    length - tamanho
    columnDefinition - tipo de dado
    */
    @Column(nullable = false, columnDefinition = "CHAR(14)", unique = true)
    private String cnpj;
    // Relacionamento com Local
    @Embedded // Cria colunas na tabela da entidade
    private Local local;
}
