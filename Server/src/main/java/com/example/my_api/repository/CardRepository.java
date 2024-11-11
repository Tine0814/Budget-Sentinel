package com.example.my_api.repository;

import com.example.my_api.model.Card;


import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

     @Transactional
    @Modifying
    @Query("DELETE FROM Card c WHERE c.cardId = :cardId")
    void deleteByCardId(String cardId);
    
    Optional<Card> findByCardId(String cardId);
    List<Card> findByUser_UserId(String userId);
}
