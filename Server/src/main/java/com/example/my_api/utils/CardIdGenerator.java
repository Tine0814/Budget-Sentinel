package com.example.my_api.utils;

import java.util.UUID;

public class CardIdGenerator {
    
    private static final String PREFIX = "cd";

    private CardIdGenerator() {}
    
    public static String generate() {
         return String.format("%s-%s", PREFIX, UUID.randomUUID().toString());
    }
}
