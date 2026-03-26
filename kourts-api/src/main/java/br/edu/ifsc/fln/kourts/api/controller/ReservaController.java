package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.model.domain.Reserva;
import br.edu.ifsc.fln.kourts.api.repository.QuadraRepository;
import br.edu.ifsc.fln.kourts.api.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private QuadraRepository quadraRepository;

    // Create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva create(@RequestBody Reserva reserva){
        Quadra quadraBanco = quadraRepository.findById(reserva.getQuadra().getId())
                .orElseThrow(() -> new RuntimeException("Quadra não encontrada"));

        reserva.setQuadra(quadraBanco);
        reserva.setValor(reserva.calcularValor());

        return reservaRepository.save(reserva);
    }

    // Read
    @GetMapping
    public List<Reserva> read() {
        return reservaRepository.findAll();
    }
}
