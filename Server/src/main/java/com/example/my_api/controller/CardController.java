package com.example.my_api.controller;

import com.example.my_api.enums.CardType;
import com.example.my_api.model.Card;
import com.example.my_api.model.User;
import com.example.my_api.service.CardService;
import com.example.my_api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @Autowired
    private UserService userService;  // Assuming UserService is defined elsewhere

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
    public ResponseEntity<?> createCard(@RequestBody Map<String, Object> cardRequestMap) {
        // Extract fields from the request
        String userId = (String) cardRequestMap.get("userId");
        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().body("User ID is required");
        }

        // Fetch the user using userId
        Optional<User> userOptional = userService.findByUserId(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOptional.get();

        // Create a new Card instance and set its properties
        Card card = new Card();
        card.setCardNumber((String) cardRequestMap.get("cardNumber"));
        card.setCardHolder((String) cardRequestMap.get("cardHolder"));
        card.setBank((String) cardRequestMap.get("bank"));
        card.setBalance(new BigDecimal(cardRequestMap.get("balance").toString()));
        card.setCardId((String) cardRequestMap.get("cardId"));
        card.setCardType(CardType.valueOf((String) cardRequestMap.get("cardType"))); // Ensure this matches an enum value
        card.setUser(user);

        // Save the card
        Card savedCard = cardService.saveCard(card);

        return ResponseEntity.ok(savedCard);
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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Card>> getCardsByUserId(@PathVariable String userId) {
        List<Card> cards = cardService.findCardsByUserId(userId);
        if (cards.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no cards are found
        }
        return ResponseEntity.ok(cards); // 200 OK with the list of cards
    }

}
