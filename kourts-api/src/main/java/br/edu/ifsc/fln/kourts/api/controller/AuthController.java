package br.edu.ifsc.fln.kourts.api.controller;


import br.edu.ifsc.fln.kourts.api.dto.JogadorDTO;
import br.edu.ifsc.fln.kourts.api.model.domain.CredenciasInvalidasException;
import br.edu.ifsc.fln.kourts.api.model.domain.InfoRepitida;
import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;
import br.edu.ifsc.fln.kourts.api.repository.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private JogadorRepository jogadorRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Jogador jogador) {
        // Null pointer exception
        try {
            Jogador j = jogadorRepository.findByApelido(jogador.getApelido());
            JogadorDTO jRespota = new JogadorDTO(j.getApelido(), j.getSenha());
            return ResponseEntity.ok(jRespota);
        } catch (CredenciasInvalidasException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NullPointerException e){
            return ResponseEntity.badRequest().body("Uma das credenciais é invalida favor tentar outra.");
        }
         //Recebe o Apelido e a Senha compara no banco se for verdadeiro devolve somente o Apelido

    }

    @PostMapping("/registrar")
    public ResponseEntity<Jogador> register(@RequestBody Jogador jogador) {

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

        this.jogadorRepository.save(jogador);

        return ResponseEntity.ok(jogador);
    }
}
