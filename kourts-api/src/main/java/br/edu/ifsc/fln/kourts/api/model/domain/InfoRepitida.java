package br.edu.ifsc.fln.kourts.api.model.domain;

public class InfoRepitida extends IllegalArgumentException {
    public InfoRepitida() {
        super("Algum valor está repitido");
    }

    public InfoRepitida(String mensagem) {
        super(mensagem);
    }
}
