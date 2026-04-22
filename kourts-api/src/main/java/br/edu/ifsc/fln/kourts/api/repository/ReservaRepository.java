package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.model.domain.Reserva;

import br.edu.ifsc.fln.kourts.api.model.domain.Situacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // Método para excluir o proprietario
    List findByQuadraId(int quadraId);
    List<Reserva> findByQuadraAndDataAndSituacao(Quadra quadra, LocalDate data, Situacao situacao);
}
