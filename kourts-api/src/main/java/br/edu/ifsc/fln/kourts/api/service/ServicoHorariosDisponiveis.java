package br.edu.ifsc.fln.kourts.api.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.model.domain.Reserva;
import br.edu.ifsc.fln.kourts.api.model.domain.Situacao;
import br.edu.ifsc.fln.kourts.api.repository.ReservaRepository;
import org.springframework.stereotype.Service;

// Assuming necessary imports for domain entities and repository:
// import your.package.Quadra;
// import your.package.Reserva;
// import your.package.Situacao;
// import your.package.repository.ReservaRepository;

@Service
public class ServicoHorariosDisponiveis {

    private final ReservaRepository reservaRepository;

    public ServicoHorariosDisponiveis(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public Map<LocalDate, List<LocalTime>> obterHorariosDisponiveisPorPeriodo(Quadra quadra, int dias) {
        Map<LocalDate, List<LocalTime>> horarios = new HashMap<>();
        LocalDate hoje = LocalDate.now();
        List<LocalTime> slotsPossiveis = IntStream.range(8, 23)
                .mapToObj(h -> LocalTime.of(h, 0))
                .collect(Collectors.toList());

        for (int i = 0; i < dias; i++) {
            LocalDate data = hoje.plusDays(i);
            List<Reserva> reservas = reservaRepository.findByQuadraAndDataAndSituacao(quadra, data, Situacao.APROVADA);
            List<LocalTime> disponiveis = new ArrayList<>();

            for (LocalTime inicio : slotsPossiveis) {
                LocalTime fimSlot = inicio.plusHours(1);
                boolean sobrepoe = reservas.stream().anyMatch(reserva ->
                        inicio.isBefore(reserva.getFim()) && fimSlot.isAfter(reserva.getInicio())
                );
                if (!sobrepoe) {
                    disponiveis.add(inicio);
                }
            }
            horarios.put(data, disponiveis);
        }
        return horarios;
    }
}
