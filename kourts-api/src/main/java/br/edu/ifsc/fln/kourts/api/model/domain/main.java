package br.edu.ifsc.fln.kourts.api.model.domain;

public class main {
    public static void main(String[] args) {
        Funcionario f = new Funcionario("gui", "gui@gui", "123", "48", "Weber", "101");
        System.out.println(f.hashCode());
    }
}
