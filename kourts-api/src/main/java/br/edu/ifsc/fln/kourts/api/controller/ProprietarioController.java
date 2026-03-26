package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;
import br.edu.ifsc.fln.kourts.api.repository.ProprietarioRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proprietarios")
public class ProprietarioController {
    private final ProprietarioRepository proprietarioRepository;

    public ProprietarioController(ProprietarioRepository proprietarioRepository) {
        this.proprietarioRepository = proprietarioRepository;
    }

    // Create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Proprietario create(@RequestBody Proprietario proprietario){
        return proprietarioRepository.save(proprietario);
    }

    // Read
    @GetMapping
    public List<Proprietario> read() {
        return proprietarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proprietario> read(@PathVariable Integer id){
        return proprietarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Proprietario> update(@PathVariable Integer id,
                                               @RequestBody Proprietario proprietario) {
        if (!proprietarioRepository.existsById(id)) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        } else {
            proprietario.setId(id);

            Proprietario proprietarioAtualizado = proprietarioRepository.save(proprietario);

            return ResponseEntity.ok(proprietarioAtualizado);
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!proprietarioRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }else  {
            proprietarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }

}