package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;
import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;
import br.edu.ifsc.fln.kourts.api.repository.ProprietarioRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProprietarioController {
    private final ProprietarioRepository proprietarioRepository;

    public ProprietarioController(ProprietarioRepository proprietarioRepository) {
        this.proprietarioRepository = proprietarioRepository;
    }

    // Create
    @PostMapping("/kourts.com.br/createProprietario")
    @ResponseStatus(HttpStatus.CREATED)
    public Proprietario create(@RequestBody Proprietario proprietario){
        return proprietarioRepository.save(proprietario);
    }

    // Read
    @GetMapping("/kourts.com.br/Proprietario")
    public List<Proprietario> read() {
        return proprietarioRepository.findAll();
    }

    @GetMapping("/kourts.com.br/Proprietario/{cnpj}")
    public ResponseEntity<Proprietario> read(@PathVariable String cnpj){
        Proprietario p =  proprietarioRepository.findByCnpj(cnpj);
        if(p != null){
            return ResponseEntity.ok(p);
        }
        return ResponseEntity.notFound().build();
    }

    // Update

    // Delete
    @DeleteMapping("/kourts.com.br/deleteProprietario/{cnpj}")
    public ResponseEntity<Void> delete(@PathVariable String cnpj) {
        // Acha o id do Proprietario
        Proprietario f = proprietarioRepository.findByCnpj(cnpj);
        // Verifica se existe algo no objeto
        if(f != null) {
            // Inseri o Id em uma variavel
            int id = f.getId();
            // Deleta a informação
            proprietarioRepository.deleteById(id);
            // Devolve o código sucesso no delete
            return ResponseEntity.noContent().build();
        }else {
            // Verifica se existe o CNPJ
            proprietarioRepository.existsProprietarioByCnpj(cnpj);
            // Devolve o código de erro
            return ResponseEntity.notFound().build();
        }
    }
}
