package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.CredenciasInvalidasException;
import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.model.domain.InfoRepitida;
import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface JogadorRepository extends JpaRepository<Jogador, Integer> {
    boolean existsByCpf(String cpf) throws InfoRepitida;

    boolean existsByApelido(String apelido) throws InfoRepitida;

    boolean existsByTelefone(String telefone) throws InfoRepitida;

    Jogador findByApelido(String apelido) throws CredenciasInvalidasException;

    void deleteByApelido(String apelido);
}
