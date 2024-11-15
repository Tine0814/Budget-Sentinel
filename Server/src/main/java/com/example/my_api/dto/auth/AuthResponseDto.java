package com.example.my_api.dto.auth;


public class AuthResponseDto {

    private String access_token;
    private String message;

    public AuthResponseDto(String access_token, String message) {
        this.access_token = access_token;
        this.message = message;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
