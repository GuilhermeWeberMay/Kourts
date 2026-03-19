package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;
import br.edu.ifsc.fln.kourts.api.repository.ProprietarioRepository;

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
public class ProprietarioController {
    private final ProprietarioRepository proprietarioRepository;

    public ProprietarioController(ProprietarioRepository proprietarioRepository) {
        this.proprietarioRepository = proprietarioRepository;
    }

    // Create
    @PostMapping("/kourts.com.br/create/Proprietario")
    @ResponseStatus(HttpStatus.CREATED)
    public Proprietario create(@RequestBody Proprietario proprietario){
        return proprietarioRepository.save(proprietario);
    }

    // Read
    @GetMapping("/kourts.com.br/get/Proprietario")
    public List<Proprietario> read() {
        return proprietarioRepository.findAll();
    }

    @GetMapping("/kourts.com.br/get/Proprietario/cnpj/{cnpj}")
    public ResponseEntity<Proprietario> read(@PathVariable String cnpj){
        Proprietario p =  proprietarioRepository.findByCnpj(cnpj);
        if(p != null){
            return ResponseEntity.ok(p);
        }
        return ResponseEntity.notFound().build();
    }

    // Update
    @PutMapping("/kourts.com.br/update/Proprietario/id/{id}")
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

    @PutMapping("/kourts.com.br/update/Proprietario/cnpj/{cnpj}")
    public ResponseEntity<Proprietario> updateByCpf(@PathVariable String cnpj,
                                               @RequestBody Proprietario proprietario) {
        Proprietario j = proprietarioRepository.findByCnpj(cnpj);
        if (j == null) {
            // Retorna mensagem de que o jogador não existe
            return ResponseEntity.notFound().build();
        } else {
            proprietario.setId(j.getId());

            Proprietario proprietarioAtualizado = proprietarioRepository.save(proprietario);

            return ResponseEntity.ok(proprietarioAtualizado);
        }
    }

    // Delete
    @DeleteMapping("/kourts.com.br/delete/Proprietario/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!proprietarioRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }else  {
            proprietarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping("/kourts.com.br/delete/Proprietario/cnpj/{cnpj}")
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
