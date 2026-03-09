package br.edu.ifsc.fln.kourts.api.model.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public abstract class Usuario {
    private String nome;
    private String email;
    private String senha;
    private String telefone;

    public Usuario(String nome, String email, String senha, String telefone) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }

    public Usuario() {
    }
}
