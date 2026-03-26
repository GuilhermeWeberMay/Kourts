package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.model.domain.Reserva;
import br.edu.ifsc.fln.kourts.api.repository.QuadraRepository;
import br.edu.ifsc.fln.kourts.api.repository.ReservaRepository;
import br.edu.ifsc.fln.kourts.api.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaService reservaService;
    private final ReservaRepository reservaRepository;

    public ReservaController(ReservaService reservaService, ReservaRepository reservaRepository) {
        this.reservaService = reservaService;
        this.reservaRepository = reservaRepository;
    }

    // Create
    @PostMapping
    public Reserva create(@RequestBody Reserva reserva) {
        return reservaService.criarReserva(reserva);
    }

    // Read
    @GetMapping
    public List<Reserva> read() {
        return reservaRepository.findAll();
    }
}
