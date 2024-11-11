package com.example.my_api.converter;

import com.example.my_api.enums.CardType;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CardTypeConverter extends CodedEnumConverter<CardType> {
    public CardTypeConverter() {
        super(CardType.class);
    }
}
