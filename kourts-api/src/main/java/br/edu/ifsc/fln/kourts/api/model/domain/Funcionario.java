package br.edu.ifsc.fln.kourts.api.model.domain;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
public class Funcionario extends Usuario {
    private String sobrenome;
    private String cpf;

    public Funcionario(String nome, String email, String senha, String telefone, String sobrenome, String cpf) {
        super(nome,email,senha,telefone);
        this.sobrenome = sobrenome;
        this.cpf = cpf;
    }
}
