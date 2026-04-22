package br.edu.ifsc.fln.kourts.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Informa que é uma classe de configuração
public class CorsConfig {

    @Bean // Fala para o Spring que esta classe ira reescrever alguma regra dele mesmo
    public WebMvcConfigurer corsConfigurer() { // WebMvcConfigurer é uma interface
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) { // Método que define as regras
                registry.addMapping("/**") // Aplicada em todas as rotas
                        .allowedOrigins("http://localhost:5500") // Somente chamadas deste endereço
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                        .allowedHeaders("*");
            }
        };
    }
}