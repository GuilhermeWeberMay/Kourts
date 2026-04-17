package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;
import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.repository.ProprietarioRepository;
import br.edu.ifsc.fln.kourts.api.repository.QuadraRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<Quadra> read() {
        return quadraRepository.findAll();
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
}
