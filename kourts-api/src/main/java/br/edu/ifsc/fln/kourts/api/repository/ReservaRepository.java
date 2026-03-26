package br.edu.ifsc.fln.kourts.api.repository;

import br.edu.ifsc.fln.kourts.api.model.domain.Reserva;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // Método para excluir o proprietario
    List findByQuadraId(int quadraId);
}
