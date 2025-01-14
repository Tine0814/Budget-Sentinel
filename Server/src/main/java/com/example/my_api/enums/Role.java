package com.example.my_api.enums;

import com.example.my_api.enums.base.CodedEnum;

public enum Role implements CodedEnum {
    SUPERADMIN(0),
    ADMIN(1),
    USER(2);

    private final int code;

    Role(int code) {
        this.code = code;
    }

    @Override
    public int getCode() {
        return code;
    }

    public static Role fromCode(int code) {
        for (Role role : Role.values()) {
            if (role.code == code) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown role code: " + code);
    }
}
