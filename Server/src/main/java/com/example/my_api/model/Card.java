package com.example.my_api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import com.example.my_api.enums.CardType;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "user_cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_id", unique = true, nullable = false)
    private String cardId;

    private String cardNumber;
    private String cardHolder;
    private String bank;
    private BigDecimal balance;

    private CardType cardType;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    public Card() {}

    public Card(String cardNumber, String cardHolder, String bank, BigDecimal balance, CardType cardType, String cardId, User user) {
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.bank = bank;
        this.balance = balance;
        this.cardType = cardType;
        this.cardId = cardId;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public CardType getCardType() {
        return cardType;
    }

    public void setCardType(CardType cardType) {
        this.cardType = cardType;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user2) {
        this.user = user2;
    }
}
