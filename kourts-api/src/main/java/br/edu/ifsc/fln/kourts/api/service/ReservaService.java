package br.edu.ifsc.fln.kourts.api.service;

import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.model.domain.Reserva;
import br.edu.ifsc.fln.kourts.api.repository.QuadraRepository;
import br.edu.ifsc.fln.kourts.api.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class ReservaService {

    private ReservaRepository reservaRepository;
    private QuadraRepository quadraRepository;

    public ReservaService(ReservaRepository reservaRepository, QuadraRepository quadraRepository) {
        this.reservaRepository = reservaRepository;
        this.quadraRepository = quadraRepository;
    }

    public Reserva criarReserva(Reserva reserva) {
        Quadra quadra = quadraRepository.findById(reserva.getQuadra().getId())
                .orElseThrow(() -> new RuntimeException("Quadra não encontrada"));

        validarHorario(reserva, quadra);

        reserva.setQuadra(quadra);
        reserva.setValor(reserva.calcularValor());

        return reservaRepository.save(reserva);
    }

    private void validarHorario(Reserva reserva, Quadra quadra) {
        if (reserva.getInicio().getMinute() != 0 || reserva.getFim().getMinute() != 0) {
            throw new RuntimeException("A reserva só pode ser feita em horários cheios");
        }

        Duration duracao = Duration.between(reserva.getInicio(), reserva.getFim());

        if (duracao.toMinutes() < 60) {
            throw new RuntimeException("A reserva deve ter no mínimo 1 hora");
        }

        if (reserva.getInicio().isBefore(quadra.getHoraAbertura())) {
            throw new RuntimeException("Horário de início fora do funcionamento da quadra");
        }

        if (reserva.getFim().isAfter(quadra.getHoraFechamento())) {
            throw new RuntimeException("Horário de fim fora do funcionamento da quadra");
        }
    }
}
