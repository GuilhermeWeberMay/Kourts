package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;
import br.edu.ifsc.fln.kourts.api.repository.JogadorRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JogadorController {
    private final JogadorRepository jogadorRepository; //Injeção de dependencia

    public JogadorController(JogadorRepository jogadorRepository) {
        this.jogadorRepository = jogadorRepository;
    }

    // Create
    @PostMapping("/kourts.com.br/createJogador")
    @ResponseStatus(HttpStatus.CREATED)
    public Jogador create (@RequestBody Jogador jogador){
        return jogadorRepository.save(jogador);
    }

    // Read
    @GetMapping("/kourts.com.br/Jogador/{id}")
    public ResponseEntity<Jogador> read(@PathVariable Integer id) {
        return jogadorRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/kourts.com.br/Jogador")
    public List<Jogador> read() {
        return jogadorRepository.findAll();
    }
    // Update
    // Delete
    @DeleteMapping("/kourts.com.br/deleteJogador/{id}") // Método com parametro
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!jogadorRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }else  {
            jogadorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }
}
