package com.example.my_api.service;

import com.example.my_api.model.Card;
import com.example.my_api.repository.CardRepository;
import com.example.my_api.utils.IdGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<Card> findAllCards() {
        return cardRepository.findAll();
    }

    public Optional<Card> findByCardId(String card_id) {
        return cardRepository.findByCardId(card_id);
    }

    public Card saveCard(Card card) {
        if (card.getCardId() == null) {
            card.setCardId(IdGenerator.generateCardId());
        }
        return cardRepository.save(card);
    }

    public void deleteByCardId(String card_id) {
        cardRepository.deleteByCardId(card_id);
    }

    public List<Card> findCardsByUserId(String userId) {
        return cardRepository.findByUser_UserId(userId);
    }
}
