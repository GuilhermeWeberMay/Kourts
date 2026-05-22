package br.edu.ifsc.fln.kourts.api.infra;

public class RegraNegocioException extends RuntimeException {
    private int status;
    private String mensagem;
    private long timestamp;

    public RegraNegocioException(int status, String mensagem) {
        this.status = status;
        this.mensagem = mensagem;
        this.timestamp = System.currentTimeMillis();
    }
}
