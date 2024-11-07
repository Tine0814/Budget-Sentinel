package com.example.my_api.dto.auth;

import com.example.my_api.dto.user.UserDto;

public class AuthResponseDto {

    private String access_token;
    private UserDto user;
    private String message;

    public AuthResponseDto(String access_token, UserDto user, String message) {
        this.access_token = access_token;
        this.user = user;
        this.message = message;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
