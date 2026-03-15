package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario,Integer> {
    // Método feito para pesquisar funcionário por CPF
    Funcionario findByCpf(String cpf);
}
