package br.edu.ifsc.fln.kourts.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Este arquivo fala para o spring apresentar as fotos da pasta resources/fotos
@Configuration // Diz para o Spring que essa é uma classe do configuração - faz a leitura no
// start Do programa
public class WebConfig implements WebMvcConfigurer { // Quandp fazemos a requisição no FrontEnd
    // essa interface fala para o Spring ir lá na pasta fotos pegar o nome dos arquivos
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Define a url - ** diz que o arquivo pode ter qualquer nome
        registry.addResourceHandler("/fotos/**")
                // Define a pasta das fotos
                .addResourceLocations("classpath:/fotos/");
    }
    /*
    Se você tiver o arquivo:src/main/resources/fotos/futsal.jpg.
    Então essa URL vai funcionar:http://localhost:8081/fotos/futsal.jpgO Spring:
    recebe a URL
    entende que começa com /fotos/
    procura o arquivo dentro de resources/fotos/
    devolve a imagem para o navegador
    */
}
