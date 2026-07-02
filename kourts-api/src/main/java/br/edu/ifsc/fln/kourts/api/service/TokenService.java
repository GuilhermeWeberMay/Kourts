package br.edu.ifsc.fln.kourts.api.service;

import br.edu.ifsc.fln.kourts.api.model.domain.Jogador;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
//    @Value("${api.security.token.secret}")
//    private String secret;

    public String generateToken(Jogador jogador){
        try{
            Algorithm algorithm = Algorithm.HMAC256("ifsc");
            String token = JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(jogador.getApelido())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256("ifsc");
            return JWT.require(algorithm)
                    .withIssuer("kourts-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            return "";
        }
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}