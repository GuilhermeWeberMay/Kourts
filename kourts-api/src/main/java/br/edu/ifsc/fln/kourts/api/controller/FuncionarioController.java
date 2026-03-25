package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.repository.FuncionarioRepository;

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

@RestController// Declara que essa classe será um Controller
@RequestMapping("/funcionarios") // Declara que todos os endpoints começaram com esse nome
public class FuncionarioController {

    private final FuncionarioRepository funcionarioRepository; // Injeção de dependecia da
    // Interface Repository

    public FuncionarioController(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    // Create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Funcionario create(@RequestBody Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    // Read
    @GetMapping
    public List<Funcionario> findAll() {
        return funcionarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> findById(@PathVariable Integer id) {
        return funcionarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> update(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        if (!funcionarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        } else {
            funcionario.setId(id);
            Funcionario funcionarioAtualizado = funcionarioRepository.save(funcionario);

            return ResponseEntity.ok(funcionarioAtualizado);
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!funcionarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        } else {
            funcionarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }
}
