package com.example.my_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CorsProperties corsProperties;

    SecurityConfig(CorsProperties corsProperties) {
        this.corsProperties = corsProperties;
    }

    /**
     * Configures the SecurityFilterChain, applying CORS, disabling CSRF for API-based authentication, 
     * and setting endpoint permissions.
     * 
     * @param http HttpSecurity object for configuring web-based security for specific http requests
     * @return SecurityFilterChain bean
     * @throws Exception if a configuration error occurs
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> buildCorsConfiguration())) // Apply custom CORS settings
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs using JWTs or stateless authentication
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/hello", "/api/users").permitAll() // Public endpoints
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .formLogin(form -> form.disable()); // Disable form-based login for REST APIs
        return http.build();
    }

    /**
     * Builds a CORS configuration using properties defined in application.properties.
     * 
     * @return CorsConfiguration object
     */
    private CorsConfiguration buildCorsConfiguration() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(corsProperties.getAllowedOriginPatterns().split(",")));
        config.setAllowedMethods(List.of(corsProperties.getAllowedMethods().split(",")));
        config.setAllowedHeaders(List.of(corsProperties.getAllowedHeaders().split(",")));
        config.setAllowCredentials(Boolean.parseBoolean(corsProperties.getAllowCredentials()));
        return config;
    }

    /**
     * Configures global CORS settings for MVC controllers if required.
     * 
     * @return WebMvcConfigurer bean
     */
    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(corsProperties.getAllowedOriginPatterns())
                        .allowedMethods(corsProperties.getAllowedMethods().split(","))
                        .allowedHeaders(corsProperties.getAllowedHeaders())
                        .allowCredentials(Boolean.parseBoolean(corsProperties.getAllowCredentials()));
            }
        };
    }
}
