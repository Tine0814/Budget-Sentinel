package com.example.my_api.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.my_api.config.security.utils.JwtUtils;
import com.example.my_api.dto.auth.AuthRequestDto;
import com.example.my_api.dto.auth.AuthResponseDto;
import com.example.my_api.dto.user.UserDto;
import com.example.my_api.enums.Role;
import com.example.my_api.model.User;
import com.example.my_api.utils.IdGenerator;

@Service
public class AuthService {
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final TokenBlacklistService tokenBlacklistService;

    public AuthService(UserService userService, JwtUtils jwtUtils, TokenBlacklistService tokenBlacklistService) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    //login Logic

      public AuthResponseDto authenticateUser(String username, String password) {
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isPresent() && userService.checkPassword(password, userOptional.get().getPassword())) {
            User user = userOptional.get();
            String accessToken = jwtUtils.generateToken(user.getUserId(), user.getUsername(), user.getRole().getCode());
            String refreshToken = jwtUtils.generateRefreshToken(user.getUserId());
            return new AuthResponseDto(accessToken, "Login successful", refreshToken);
        }else{
            return new AuthResponseDto(null, "Invalid username or password", null);
        }
    }

    //register user
    public String registerUser(AuthRequestDto authRequest) throws IllegalArgumentException {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();
        Integer roleCode = authRequest.getRole();

        Role role = Role.fromCode(roleCode);

        Optional<User> existingUser = userService.findByUsername(username);
        if (existingUser.isPresent()) {
            return "Username already taken";
        }

        User user = new User(username, password, role, IdGenerator.generateUserId());
        userService.saveUser(user);

        return "User registered successfully";
    }

    //logout 
    public void logout(String accessToken, String refreshToken) {
        tokenBlacklistService.blacklistToken(accessToken);
        if (refreshToken != null) {
            tokenBlacklistService.blacklistToken(refreshToken);
        }
    }

    //validate Token

    public Map<String, Object> validateToken(String token) {
        if (!jwtUtils.validateToken(token, jwtUtils.extractUsername(token))) { 
            throw new IllegalArgumentException("Invalid token");
        }
    
        String userId = jwtUtils.extractUserId(token);
        Optional<User> userOptional = userService.findByUserId(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }
    
        User user = userOptional.get();
        UserDto userDto = new UserDto(user.getUserId(), user.getUsername(), user.getRole(), user.getRole().getCode());
    
        Map<String, Object> response = new HashMap<>();
        response.put("isValid", true);
        response.put("user", userDto);
        return response;
    }
    

    //refresh token

    public AuthResponseDto refreshToken(String refreshToken) {
        // Validate refresh token
        if (refreshToken == null || !jwtUtils.validateToken(refreshToken, null)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        // Extract user ID from the refresh token
        String userId = jwtUtils.extractUserId(refreshToken);

        // Retrieve the user from the database
        Optional<User> userOptional = userService.findByUserId(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        // Generate a new access token and refresh token
        String accessToken = jwtUtils.generateToken(user.getUserId(), user.getUsername(), user.getRole().getCode());
        String newRefreshToken = jwtUtils.generateRefreshToken(user.getUserId());

        // Blacklist the old refresh token
        tokenBlacklistService.blacklistToken(refreshToken);

        // Return the new tokens
        return new AuthResponseDto(accessToken, "Token refreshed successfully", newRefreshToken);
    }

    //role given 
    public String getProtectedData(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing token");
        }

        // Extract role code from the token
        String trimmedToken = token.substring(7);
        Integer roleCode = jwtUtils.extractUserRole(trimmedToken);
        if (roleCode == null) {
            throw new IllegalArgumentException("Invalid role code");
        }

        Role role = Role.fromCode(roleCode);
        switch (role) {
            case SUPERADMIN:
                return "Access granted to " + role.name();
            case ADMIN:
                return "Access granted to " + role.name();
            case USER:
                return "Access granted to " + role.name();
            default:
                throw new SecurityException("Access denied for role: " + role.name());
        }
    }


    //auth login 
       public AuthResponseDto handleOAuth2Login(OAuth2User oauth2User) {
        // Extract email or login name
        String email = oauth2User.getAttribute("email");
        if (email == null) {
            email = oauth2User.getAttribute("login");
        }

        // Check if the user already exists
        Optional<User> existingUser = userService.findByUsername(email);
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
        } else {
            // Create new user with a default password and role
            user = new User(email, "defaultPassword", Role.USER, IdGenerator.generateUserId());
            userService.saveUser(user);
        }

        // Generate tokens
        String accessToken = jwtUtils.generateToken(user.getUserId(), user.getUsername(), user.getRole().getCode());
        String refreshToken = jwtUtils.generateRefreshToken(user.getUserId());

        // Return the authentication response
        return new AuthResponseDto(accessToken, "Login successful through OAuth2", refreshToken);
    }

}
