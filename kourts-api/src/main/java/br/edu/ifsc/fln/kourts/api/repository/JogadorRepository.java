package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JogadorRepository extends JpaRepository<Jogador,Integer> {
    boolean existsByCpf(String cpf);
    boolean existsByApelido(String apelido);
    boolean existsByTelefone(String telefone);
}
