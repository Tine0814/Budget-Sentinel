package com.example.my_api.converter;

import com.example.my_api.enums.Role;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RoleConverter extends CodedEnumConverter<Role> {
    public RoleConverter() {
        super(Role.class);
    }
}
