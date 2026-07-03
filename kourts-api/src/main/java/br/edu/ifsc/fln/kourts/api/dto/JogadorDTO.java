package br.edu.ifsc.fln.kourts.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JogadorDTO {
    private String apelido;
    private String senha;
}
