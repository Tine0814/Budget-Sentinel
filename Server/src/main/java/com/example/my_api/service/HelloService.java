package com.example.my_api.service;

import com.example.my_api.model.GreetingModel;

import org.springframework.stereotype.Service;

@Service
public class HelloService {

    public GreetingModel getGreeting() {
        return new GreetingModel("Hello from the Spring Boot API!");
    }
}
