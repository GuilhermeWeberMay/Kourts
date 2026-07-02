package br.edu.ifsc.fln.kourts.api.model.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

//Lombok
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
// Jakarta
@Entity
public class Jogador extends Usuario implements UserDetails {
/*
    unique - não pode repetir
    nullable - não pode ser null
    length - tamanho
    columnDefinition - tipo de dado
    */

    @Column(nullable = false, length = 30, unique = true)
    private String apelido;

    @Column(nullable = false, columnDefinition = "CHAR(11)", unique = true)
    private String cpf;

    @Column(nullable = false, length = 64)
    private String sobrenome;

    private Permissoes permissoes = Permissoes.JOGADOR;

    // Relacionamento com Local
    @Embedded // Cria colunas na tabela da entidade
    private Local local;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.permissoes == Permissoes.JOGADOR) return List.of(new SimpleGrantedAuthority("ROLE_JOGADOR"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USUARIO"));
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return apelido;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
