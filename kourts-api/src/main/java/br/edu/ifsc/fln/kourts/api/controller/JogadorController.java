package br.edu.ifsc.fln.kourts.api.controller;

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
    @PostMapping("/kourts.com.br/create/Jogador")
    @ResponseStatus(HttpStatus.CREATED)
    public Jogador create(@RequestBody Jogador jogador) {
        return jogadorRepository.save(jogador);
    }

    // Read
    @GetMapping("/kourts.com.br/get/Jogador")
    public List<Jogador> read() {
        return jogadorRepository.findAll();
    }

    @GetMapping("/kourts.com.br/get/Jogador/id/{id}")
    public ResponseEntity<Jogador> read(@PathVariable Integer id) {
        return jogadorRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Método especial para achar Jogador por CPF
    @GetMapping("/kourts.com.br/get/Jogador/cpf/{cpf}")
    public ResponseEntity<Jogador> readByCpf(@PathVariable String cpf) {
        Jogador j = jogadorRepository.findByCpf(cpf);
        if (j != null) {
            return ResponseEntity.ok(j);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Método especial para achar Jogador por apelido (como se fosse o @ do instagram)
    @GetMapping("/kourts.com.br/get/Jogador/apelido/{apelido}")
    public ResponseEntity<Jogador> readByApelido(@PathVariable String apelido) {
        Jogador j = jogadorRepository.findByApelido(apelido);
        if (j != null) {
            return ResponseEntity.ok(j);
        }
        return ResponseEntity.notFound().build();
    }

    // Update
    @PutMapping("/kourts.com.br/update/Jogador/id/{id}")
    public ResponseEntity<Jogador> update(@PathVariable Integer id, @RequestBody Jogador jogador) {
        if (!jogadorRepository.existsById(id)) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        } else {
            jogador.setId(id);

            Jogador jogadorAtualizado = jogadorRepository.save(jogador);

            return ResponseEntity.ok(jogadorAtualizado);
        }
    }

    @PutMapping("/kourts.com.br/update/Jogador/cpf/{cpf}")
    public ResponseEntity<Jogador> updateByCpf(@PathVariable String cpf,
                                               @RequestBody Jogador jogador) {
        Jogador j = jogadorRepository.findByCpf(cpf);
        if (j == null) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        } else {
            jogador.setId(j.getId());

            Jogador jogadorAtualizado = jogadorRepository.save(jogador);

            return ResponseEntity.ok(jogadorAtualizado);
        }
    }

    @PutMapping("/kourts.com.br/update/Jogador/apelido/{apelido}")
    public ResponseEntity<Jogador> updateByApelido(@PathVariable String apelido,
                                               @RequestBody Jogador jogador) {
        Jogador j = jogadorRepository.findByApelido(apelido);
        if (j == null) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        } else {
            jogador.setId(j.getId());

            Jogador jogadorAtualizado = jogadorRepository.save(jogador);

            return ResponseEntity.ok(jogadorAtualizado);
        }
    }

    // Delete
    @DeleteMapping("/kourts.com.br/delete/Jogador/id/{id}") // Método com parametro
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        if (!jogadorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        } else {
            jogadorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping("/kourts.com.br/delete/Jogador/cpf/{cpf}")
    public ResponseEntity<Void> deleteByCpf(@PathVariable String cpf) {
        // Acha o id do Proprietario
        Jogador j = jogadorRepository.findByCpf(cpf);
        // Verifica se existe algo no objeto
        if (j != null) {
            // Inseri o Id em uma variavel
            int id = j.getId();
            // Deleta a informação
            jogadorRepository.deleteById(id);
            // Devolve o código sucesso no delete
            return ResponseEntity.noContent().build();
        } else {
            // Devolve o código de erro
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/kourts.com.br/delete/Jogador/apelido/{apelido}")
    public ResponseEntity<Void> deleteByApelido(@PathVariable String apelido) {
        // Acha o id do Proprietario
        Jogador j = jogadorRepository.findByApelido(apelido);
        // Verifica se existe algo no objeto
        if (j != null) {
            // Inseri o Id em uma variavel
            int id = j.getId();
            // Deleta a informação
            jogadorRepository.deleteById(id);
            // Devolve o código sucesso no delete
            return ResponseEntity.noContent().build();
        } else {
            // Devolve o código de erro
            return ResponseEntity.notFound().build();
        }
    }
}
