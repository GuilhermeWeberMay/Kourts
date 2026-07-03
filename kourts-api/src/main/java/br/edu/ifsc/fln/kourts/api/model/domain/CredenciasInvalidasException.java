package br.edu.ifsc.fln.kourts.api.model.domain;

public class CredenciasInvalidasException extends NullPointerException {
    public CredenciasInvalidasException(String message) {
        super(message);
    }
}
