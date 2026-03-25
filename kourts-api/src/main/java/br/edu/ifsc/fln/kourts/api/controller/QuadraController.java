package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.model.domain.Proprietario;
import br.edu.ifsc.fln.kourts.api.model.domain.Quadra;
import br.edu.ifsc.fln.kourts.api.repository.QuadraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("quadras")
public class QuadraController {

    @Autowired
    private QuadraRepository quadraRepository;

    // Create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Quadra create(@RequestBody Quadra quadra){
        return quadraRepository.save(quadra);
    }
}
