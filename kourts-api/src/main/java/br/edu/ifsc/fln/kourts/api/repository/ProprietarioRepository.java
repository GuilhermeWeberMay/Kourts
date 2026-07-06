package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {
    // Método feito para pesquisar funcionário por CPF
    Proprietario findByEmail(String email);
    // Método feito para ver se o CNPJ existe
    boolean existsProprietarioByCnpj(String cnpj);
    boolean existsProprietarioByNome(String nome);
    boolean existsProprietarioByEmail(String email);
    boolean existsProprietarioByTelefone(String telefone);
}
