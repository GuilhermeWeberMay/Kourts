package br.edu.ifsc.fln.kourts.api.controller;

import br.edu.ifsc.fln.kourts.api.dto.JogadorDTO;
import br.edu.ifsc.fln.kourts.api.dto.LoginResponseDTO;
import br.edu.ifsc.fln.kourts.api.model.domain.Funcionario;
import br.edu.ifsc.fln.kourts.api.model.domain.InfoRepitida;
import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;
import br.edu.ifsc.fln.kourts.api.model.domain.Permissoes;
import br.edu.ifsc.fln.kourts.api.repository.JogadorRepository;
import br.edu.ifsc.fln.kourts.api.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JogadorRepository jogadorRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated JogadorDTO jogador) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(jogador.getLogin(), jogador.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Jogador) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/registrar")
    public ResponseEntity register(@RequestBody @Validated Jogador jogador) {
        if(this.jogadorRepository.findByApelido(jogador.getApelido()) != null) return ResponseEntity.badRequest().build();

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

        return ResponseEntity.ok().build();
    }
}
