package com.example.my_api.converter;

import com.example.my_api.enums.CardType;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CardTypeConverter implements AttributeConverter<CardType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(CardType cardType) {
        if (cardType == null) {
            return null;
        }
        return cardType.getCode();
    }

    @Override
    public CardType convertToEntityAttribute(Integer code) {
        if (code == null) {
            return null;
        }
        return CardType.fromCode(code);
    }
}
