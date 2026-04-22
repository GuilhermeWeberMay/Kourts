package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok
@Getter // Métodos getters
@Setter // Métodos setters
@NoArgsConstructor // Faz um construtor sem nenhum atributo - é necessário isso para o spring funcionar
@EqualsAndHashCode // Métodos Equals e Hash Code
// Jpa
@Entity // Fala que esta classe será uma entidade no banco
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS) // Significa que será uma estratégia de herança no banco
public abstract class Usuario {
    /*
    unique - não pode repetir
    nullable - não pode ser null
    length - tamanho
    columnDefinition - tipo de dado
    */

    @Id // Declara que este atributo será a chave primária da entidade
    @GeneratedValue(strategy = GenerationType.SEQUENCE) // Chave primária será AUTO-INCREMENT
    @Column(unique = true, nullable = false)
    private int id;

    @Column(nullable = false, length = 32)
    private String nome;

    @Column(nullable = false, length = 128)
    private String email;

    @Column(nullable = false, length = 32)
    private String senha;

    @Column(nullable = false, columnDefinition = "CHAR(11)", unique = true)
    private String telefone;

}