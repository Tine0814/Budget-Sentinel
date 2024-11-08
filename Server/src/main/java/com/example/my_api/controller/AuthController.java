package com.example.my_api.controller;

import com.example.my_api.config.security.utils.JwtUtils;
import com.example.my_api.dto.auth.AuthRequestDto;
import com.example.my_api.dto.auth.AuthResponseDto;
import com.example.my_api.dto.user.UserDto;
import com.example.my_api.enums.Role;
import com.example.my_api.model.User;
import com.example.my_api.service.TokenBlacklistService;
import com.example.my_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final TokenBlacklistService tokenBlacklistService;

    public AuthController(UserService userService, JwtUtils jwtUtils,TokenBlacklistService tokenBlacklistService) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    //login api

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto loginRequestDto) {
        String username = loginRequestDto.getUsername();
        String password = loginRequestDto.getPassword();

        return userService.findByUsername(username)
                .filter(user -> userService.checkPassword(password, user.getPassword()))
                .map(user -> {
                    // Generate JWT token
                    String accessToken = jwtUtils.generateToken(user.getId(), user.getUsername(), user.getRole().getCode());

                    UserDto userDto = new UserDto(user.getId(), user.getUsername(), user.getRole(), user.getRole().getCode());
                    AuthResponseDto loginResponse = new AuthResponseDto(
                            accessToken,
                            userDto,
                            "Login successful"
                    );

                    return ResponseEntity.ok(loginResponse);
                })
                .orElseGet(() -> {
                    // Return unauthorized response if login fails
                    return ResponseEntity.status(401).body(new AuthResponseDto(null, null, "Invalid username or password"));
                });
    }

    //registration if the system required

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequestDto loginRequestDto) {
        String username = loginRequestDto.getUsername();
        String password = loginRequestDto.getPassword();
        Integer roleCode = loginRequestDto.getRole();
    
        try {
            Role role =  Role.fromCode(roleCode);
    
            if (userService.findByUsername(username).isPresent()) {
                return ResponseEntity.status(409).body("Username already taken");
            }
            User user = new User(username, password, role);
            userService.saveUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Invalid role");
        }
    }

    //token validation

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("{\"isValid\": false}");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        boolean isValid = jwtUtils.validateToken(token, jwtUtils.extractUsername(token));
        
        return ResponseEntity.ok("{\"isValid\": " + isValid + "}");
    }

    //logout api to destroy token

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }


    @GetMapping("/protected-endpoint")
    public ResponseEntity<String> getProtectedData(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Integer roleCode = jwtUtils.extractUserRole(token);
    
            if (roleCode != null) {
                try {
                    Role role = Role.fromCode(roleCode);
                    switch (role) {
                        case SUPERADMIN:
                            return ResponseEntity.ok("Access granted to " + role.name());
                        case ADMIN:
                            return ResponseEntity.ok("Access granted to " + role.name());
                        case USER:
                            return ResponseEntity.ok("Access granted to " + role.name());
                        default:
                            return ResponseEntity.status(403).body("Access denied for role: " + role.name());
                    }
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.status(400).body("Invalid role code: " + roleCode);
                }
            }
        }
        return ResponseEntity.status(401).body("Unauthorized");
    }
    
    
    
}
