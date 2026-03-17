package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JogadorRepository extends JpaRepository<Jogador,Integer> {

    // Método feito para pesquisar Jogador por apelido
    Jogador findByApelido(String apelido);

    // Método para pesquisar Jogador por cpf
    Jogador findByCpf(String cpf);

}
