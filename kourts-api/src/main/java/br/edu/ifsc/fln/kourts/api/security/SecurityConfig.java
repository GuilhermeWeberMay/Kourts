package br.edu.ifsc.fln.kourts.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    SecurityFilter securityFilter;

    // 1. Configuração das Regras de Bloqueio
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         return http
                .csrf(csrf -> csrf.disable()) // Desabilita proteção CSRF (necessário para APIs REST)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/registrar").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/jogadores").hasRole("Jogador")
                        .anyRequest().authenticated()
                )
                 .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                 .build();// Habilita autenticação básica via Header
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
//    // 2. Criação dos Usuários em Memória (Hardcoded)
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails admin = User.withUsername("admin")
//                .password("{noop}admin123") // {noop} avisa o Spring para não exigir criptografia
//                .roles("ADMIN")
//                .build();
//
//        UserDetails usuarioComum = User.withUsername("aluno")
//                .password("{noop}aluno123")
//                .roles("USER")
//                .build();
//
//        return new InMemoryUserDetailsManager(admin, usuarioComum);
//    }
}
