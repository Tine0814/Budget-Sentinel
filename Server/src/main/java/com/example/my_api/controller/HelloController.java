package com.example.my_api.controller;

import com.example.my_api.dto.HelloResponseDto;
import com.example.my_api.service.HelloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    private final HelloService helloService;

    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    @GetMapping("/hello")
    public HelloResponseDto sayHello() {
        // Convert model to DTO
        return new HelloResponseDto(helloService.getGreeting().getMessage());
    }
}
