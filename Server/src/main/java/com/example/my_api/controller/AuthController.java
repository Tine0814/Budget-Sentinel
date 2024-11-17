package com.example.my_api.controller;

import com.example.my_api.dto.auth.AuthRequestDto;
import com.example.my_api.dto.auth.AuthResponseDto;
import com.example.my_api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto loginRequestDto) {
        try {
            AuthResponseDto response = authService.authenticateUser(loginRequestDto.getUsername(), loginRequestDto.getPassword());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponseDto(null, e.getMessage(), null));
        }
    }

    // Logout API to destroy token
    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authorizationHeader, @RequestBody(required = false) String refreshToken) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7);
            authService.logout(accessToken, refreshToken);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    // User registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequestDto loginRequestDto) {
        try {
            String response = authService.registerUser(loginRequestDto);
            if ("Username already taken".equals(response)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Token validation
    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("{\"isValid\": false}");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        try {
            Map<String, Object> response = authService.validateToken(token);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // Token refresh
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponseDto> refreshToken(@RequestBody Map<String, String> tokenRequest) {
        String refreshToken = tokenRequest.get("refreshToken");
        System.err.println("Refresh token: " + refreshToken);
        try {
            AuthResponseDto response = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponseDto(null, e.getMessage(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponseDto(null, e.getMessage(), null));
        }
    }

    // Protected endpoint
    @GetMapping("/protected-endpoint")
    public ResponseEntity<String> getProtectedData(@RequestHeader("Authorization") String authHeader) {
        try {
            String response = authService.getProtectedData(authHeader);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    // OAuth2 login success handler
    @GetMapping("/oauth2/login-success")
    public ResponseEntity<AuthResponseDto> handleOAuth2Login(OAuth2AuthenticationToken authentication) {
        try {
            AuthResponseDto response = authService.handleOAuth2Login(authentication.getPrincipal());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AuthResponseDto(null, "OAuth2 login failed", null));
        }
    }
}
