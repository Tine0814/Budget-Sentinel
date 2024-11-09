package com.example.my_api.converter;

import com.example.my_api.enums.Role;

import jakarta.persistence.AttributeConverter;

public class RoleConverter implements AttributeConverter<Role, Integer> {

       @Override
    public Integer convertToDatabaseColumn(Role role) {
        if (role == null) {
            return null;
        }
        return role.getCode();
    }

    @Override
    public Role convertToEntityAttribute(Integer code) {
        if (code == null) {
            return null;
        }
        return Role.fromCode(code);
    }
    
}
