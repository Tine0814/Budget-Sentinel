package com.example.my_api.dto;

public class HelloResponseDto {

    private String message;

    public HelloResponseDto(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
