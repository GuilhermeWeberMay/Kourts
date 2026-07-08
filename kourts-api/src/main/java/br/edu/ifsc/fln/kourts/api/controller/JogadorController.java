package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.InfoRepitida;

import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;
import br.edu.ifsc.fln.kourts.api.repository.JogadorRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
@RequestMapping("/jogadores")
public class JogadorController {
    private final JogadorRepository jogadorRepository; //Injeção de dependencia

    public JogadorController(JogadorRepository jogadorRepository) {
        this.jogadorRepository = jogadorRepository;
    }

    // Create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Jogador create(@RequestBody Jogador jogador) {
        boolean cpfExistente = jogadorRepository.existsByCpf(jogador.getCpf());
        if (cpfExistente) {
            System.out.println("Cpf existente");
            throw new InfoRepitida("cpf existente");
        }
        boolean apelidoExiste = jogadorRepository.existsByApelido(jogador.getApelido());
        if (apelidoExiste) {
            System.out.println("Apelido existente");
            throw new InfoRepitida("apelido existente");
        }
        boolean telefoneExiste = jogadorRepository.existsByTelefone(jogador.getTelefone());
        if (telefoneExiste) {
            System.out.println("telefone existente");
            throw new InfoRepitida("telefone existente");
        }
        return jogadorRepository.save(jogador);
    }

    // Read
    @GetMapping
    public List<Jogador> read() {
        return jogadorRepository.findAll();
    }

    @GetMapping("/{apelido}")
    public ResponseEntity<Jogador> read(@PathVariable String apelido) {
        //return jogadorRepository.findByApelido(apelido).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        Jogador j =  jogadorRepository.findByApelido(apelido);
        if (j == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(j);
    }

    // Update
    @PutMapping("/{apelido}")
    public ResponseEntity update(@PathVariable String apelido, @RequestBody Jogador jogador) {
        Jogador j = jogadorRepository.findByApelido(apelido);
        if (j == null) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        }

        // só bloqueia se o apelido novo for diferente do atual E já pertencer a outro jogador
        if (!jogador.getApelido().equals(apelido) && jogadorRepository.existsByApelido(jogador.getApelido())) {
            return ResponseEntity.badRequest().body("Apelido já existente");
        }


        Jogador jogadorAtualizado = jogadorRepository.save(jogador);

            return ResponseEntity.ok(jogadorAtualizado);
        }


    // Delete
    @DeleteMapping("/{apelido}") // Método com parametro
    public ResponseEntity<Void> deleteById(@PathVariable String apelido) {
        if (!jogadorRepository.existsByApelido(apelido)) {
            return ResponseEntity.notFound().build();
        } else {
            Jogador j = jogadorRepository.findByApelido(apelido);
            jogadorRepository.deleteById(j.getId());
            return ResponseEntity.noContent().build();
        }
    }

}