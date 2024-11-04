package com.example.my_api.controller;

import com.example.my_api.model.TestEntity;
import com.example.my_api.repository.TestEntityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestEntityController {

    private final TestEntityRepository repository;

    public TestEntityController(TestEntityRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/test-entities")
    public List<TestEntity> getAllTestEntities() {
        return repository.findAll();
    }
}
