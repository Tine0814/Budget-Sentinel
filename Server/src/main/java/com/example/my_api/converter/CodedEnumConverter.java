package com.example.my_api.converter;

import jakarta.persistence.AttributeConverter;
import java.util.Arrays;

import com.example.my_api.enums.base.CodedEnum;

public abstract class CodedEnumConverter<T extends Enum<T> & CodedEnum> implements AttributeConverter<T, Integer> {

    private final Class<T> enumType;

    protected CodedEnumConverter(Class<T> enumType) {
        this.enumType = enumType;
    }

    @Override
    public Integer convertToDatabaseColumn(T attribute) {
        return attribute == null ? null : attribute.getCode();
    }

    @Override
    public T convertToEntityAttribute(Integer code) {
        if (code == null) {
            return null;
        }
        return Arrays.stream(enumType.getEnumConstants())
                     .filter(e -> e.getCode() == code)
                     .findFirst()
                     .orElseThrow(() -> new IllegalArgumentException("Unknown code: " + code));
    }
}
