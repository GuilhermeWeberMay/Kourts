package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.repository.FuncionarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController// Declara que essa classe será um Controller
public class FuncionarioController {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioController(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    // Create
    @PostMapping("kourts.com.br/createFuncionario")
    @ResponseStatus(HttpStatus.CREATED)
    public Funcionario create(@RequestBody Funcionario funcionario){
        return funcionarioRepository.save(funcionario);
    }

    // Read
    @GetMapping("kourts.com.br/Funcionario")
    public List<Funcionario> findAll(){
        return funcionarioRepository.findAll();
    }

    @GetMapping("kourts.com.br/Funcionario/{id}")
    public ResponseEntity<Funcionario> findById(@PathVariable Integer id){
        return funcionarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update

    // Delete
    @DeleteMapping("/kourts.com.br/deleteFuncionario/{id}") // Método com parametro
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!funcionarioRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }else  {
            funcionarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }
}
