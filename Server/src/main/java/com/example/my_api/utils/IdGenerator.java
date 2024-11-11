package com.example.my_api.utils;

import java.util.UUID;

public class IdGenerator {
    
    private IdGenerator() {}

    public static String generateWithPrefix(String prefix) {
        if (prefix == null || prefix.isEmpty()) {
            throw new IllegalArgumentException("Prefix cannot be null or empty");
        }
        return String.format("%s-%s", prefix, UUID.randomUUID().toString());
    }

    public static String generateUserId() {
        return generateWithPrefix(Prefixes.USER);
    }

    public static String generateCardId() {
        return generateWithPrefix(Prefixes.CARD);
    }
}
