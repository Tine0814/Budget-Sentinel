package com.example.my_api.utils;


import java.util.UUID;

public class UserIdGenerator {
    
    private static final String PREFIX = "usr";

    private UserIdGenerator() {}

    public static String generate() {
        return String.format("%s-%s", PREFIX, UUID.randomUUID().toString());
    }

    public static String generateWithCustomPrefix(String prefix) {
        if (prefix == null || prefix.isEmpty()) {
            throw new IllegalArgumentException("Prefix cannot be null or empty");
        }
        return String.format("%s-%s", prefix, UUID.randomUUID().toString());
    }

}
