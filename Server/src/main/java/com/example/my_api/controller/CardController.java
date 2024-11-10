package com.example.my_api.controller;

import com.example.my_api.model.Card;
import com.example.my_api.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping
    public List<Card> getAllCards() {
        return cardService.findAllCards();
    }

    @GetMapping("/{card_id}")
    public ResponseEntity<?> getCardById(@PathVariable String card_id) {
        Optional<Card> card = cardService.findByCardId(card_id);
        if (card.isPresent()) {
            return ResponseEntity.ok(card.get());
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Card with ID " + card_id + " not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    

    @PostMapping
    public Card createCard(@RequestBody Card card) {
        return cardService.saveCard(card);
    }

    @PutMapping("/{card_id}")
    public ResponseEntity<Card> updateCard(@PathVariable String card_id, @RequestBody Card card) {
        if (!cardService.findByCardId(card_id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        card.setCardId(card_id);
        return ResponseEntity.ok(cardService.saveCard(card));
    }

    @DeleteMapping("/{card_id}")
    public ResponseEntity<Void> deleteCard(@PathVariable String card_id) {
        if (!cardService.findByCardId(card_id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cardService.deleteByCardId(card_id);
        return ResponseEntity.noContent().build();
    }
}
