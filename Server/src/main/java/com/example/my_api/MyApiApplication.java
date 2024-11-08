package com.example.my_api;

import com.example.my_api.model.User;
import com.example.my_api.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MyApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApiApplication.class, args);
    }

    @Bean
    CommandLineRunner seedDatabase(UserRepository userRepository) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(new User("dastine", passwordEncoder.encode("DjH@y081400"), "Admin"));
                System.out.println("Database has been seeded with new data.");
            } else {
                System.out.println("Database has already been seeded. Skipping seeding process.");
            }
        };
    }
}
