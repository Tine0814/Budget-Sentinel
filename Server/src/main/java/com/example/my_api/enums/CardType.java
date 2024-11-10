package com.example.my_api.enums;

public enum CardType {
    ATM(0),
    GCASH(1),
    MAYA(2),
    OTHER(3);

    private final int code;

    CardType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static CardType fromCode(int code) {
        for (CardType cardType : CardType.values()) {
            if (cardType.code == code) {
                return cardType;
            }
        }
        throw new IllegalArgumentException("Unknown card type code: " + code);
    }
}
