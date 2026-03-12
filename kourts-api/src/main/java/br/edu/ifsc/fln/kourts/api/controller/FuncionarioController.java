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

    // Read
    @GetMapping("kourts.com.br/funcionarios")
    public List<Funcionario> findAll(){
        return funcionarioRepository.findAll();
    }

    @GetMapping("kourts.com.br/funcionarios/{id}")
    public ResponseEntity<Funcionario> findById(@PathVariable Integer id){
        return funcionarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create
    @PostMapping("kourts.com.br/createFuncionario")
    @ResponseStatus(HttpStatus.CREATED)
    public Funcionario create(@RequestBody Funcionario funcionario){
        return funcionarioRepository.save(funcionario);
    }
}
