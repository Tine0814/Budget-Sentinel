package com.example.my_api.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.my_api.config.CorsProperties;
import com.example.my_api.config.security.utils.JwtUtils;
import com.example.my_api.service.TokenBlacklistService;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CorsProperties corsProperties;
    private final JwtUtils jwtUtils;
    private final TokenBlacklistService tokenBlacklistService;

    public SecurityConfig(CorsProperties corsProperties, JwtUtils jwtUtils,
        TokenBlacklistService tokenBlacklistService) {
        this.corsProperties = corsProperties;
        this.jwtUtils = jwtUtils;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    /** Error handler for 401 no response in body postman and network */

    @Bean
    AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.getWriter().write("Access Denied: " + accessDeniedException.getMessage());
    };
}

    @Bean
    AuthenticationEntryPoint authenticationEntryPoint() {
        return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);
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
                // Allow access to login, registration, and OAuth2 endpoints
                .requestMatchers("/api/auth/login", "/api/auth/oauth2/login-success").permitAll()
                // All other endpoints require authentication
                .requestMatchers("/api/users**").hasAnyAuthority("0", "1") // Assuming "0" is ADMIN, "1" is SUPERADMIN
                .requestMatchers("/ticket/**").hasAnyAuthority("2", "0", "1")
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
            .defaultSuccessUrl("http://localhost:3000") 
            .successHandler((request, response, authentication) -> {
                response.sendRedirect("http://localhost:3000");
            })
        )
            .formLogin(form -> form.disable()); // Disable form-based login for REST APIs
        // Add JWT filter for custom JWT-based authentication
        http.addFilterBefore(new JwtAuthenticationFilter(jwtUtils, tokenBlacklistService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
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
