package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.dto.QuadraHorariosDTO;
import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;
import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.repository.ProprietarioRepository;
import br.edu.ifsc.fln.kourts.api.repository.QuadraRepository;

import br.edu.ifsc.fln.kourts.api.service.ServicoHorariosDisponiveis;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quadras")
public class QuadraController {

    @Autowired
    private QuadraRepository quadraRepository;
    @Autowired
    private ProprietarioRepository proprietarioRepository;

    // Create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Quadra create(@RequestBody Quadra quadra) {
        Proprietario proprietario = proprietarioRepository.findById(quadra.getProprietario().getId())
                .orElseThrow(() -> new RuntimeException("Proprietário não encontrado"));

        quadra.setProprietario(proprietario);
        quadra.gerarHorariosDisponiveis();
        return quadraRepository.save(quadra);
    }
    // Read
    @GetMapping
//    public List<Quadra> read() {
//        return quadraRepository.findAll();
//    }
    public ResponseEntity<List<QuadraHorariosDTO>> readAll(@RequestParam(defaultValue = "3") int dias) {
        return ResponseEntity.ok(
                quadraRepository.findAll().stream()
                        .map(quadra -> {
                            Map<LocalDate, List<LocalTime>> horariosDisponiveis =
                                    servicoHorariosDisponiveis.obterHorariosDisponiveisPorPeriodo(quadra, dias);
                            return new QuadraHorariosDTO(quadra, horariosDisponiveis);
                        })
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quadra> read(@PathVariable Integer id){
        return quadraRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Quadra> update(@PathVariable Integer id,
                                               @RequestBody Quadra quadra) {
        if (!quadraRepository.existsById(id)) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        } else {
            quadra.setId(id);

            Quadra quadraAtualizada = quadraRepository.save(quadra);

            return ResponseEntity.ok(quadraAtualizada);
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!quadraRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }else  {
            quadraRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }

    @Autowired
    private ServicoHorariosDisponiveis servicoHorariosDisponiveis;

    @GetMapping("{id}/horarios-disponiveis")
    public ResponseEntity<Map<LocalDate, List<LocalTime>>> obterHorariosDisponiveisPorPeriodo(
            @PathVariable Integer id,
            @RequestParam(defaultValue = "3") int dias) {

        Quadra quadra = quadraRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quadra não encontrada"));

        Map<LocalDate, List<LocalTime>> horarios = servicoHorariosDisponiveis
                .obterHorariosDisponiveisPorPeriodo(quadra, dias);

        return ResponseEntity.ok(horarios);
    }
}
