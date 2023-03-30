package com.bank.backend.controller;

import com.bank.backend.dto.CardCreateDto;
import com.bank.backend.dto.GetMyCardsDto;
import com.bank.backend.model.Card;
import com.bank.backend.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
public class CardController {

    @Autowired
    CardService cardService;

    @PostMapping("/registercard")
    public Card registercard(@RequestBody CardCreateDto cardCreateDto) throws ParseException {
        return cardService.addCard(cardCreateDto);
    }

    @GetMapping("/getallcards")
    public List<Card> getallcards() {
        return cardService.fetchAllCards();
    }

    @PostMapping("/getmycards")
    public List<Card> getmycards(@RequestBody GetMyCardsDto getMyCardsDto) {
        return cardService.fetchMyCards(getMyCardsDto.getAccountId());
    }
}
