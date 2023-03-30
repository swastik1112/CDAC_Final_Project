package com.bank.backend.controller;

import com.bank.backend.dto.GetMyPassbooksDto;
import com.bank.backend.dto.PassbookCreateDto;
import com.bank.backend.model.Passbook;
import com.bank.backend.service.PassbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
public class PassbookController {

    @Autowired
    PassbookService passbookService;

    @PostMapping("/registerpassbook")
    public Passbook registerpassbook(@RequestBody PassbookCreateDto passbookCreateDto) throws ParseException {
        return passbookService.createPassbook(passbookCreateDto);
    }

    @GetMapping("/getallpassbooks")
    public List<Passbook> getallpassbooks() {
        return passbookService.fetchAllPassbook();
    }

    @PostMapping("/getmypassbooks")
    public List<Passbook> getmypassbooks(@RequestBody GetMyPassbooksDto getMyPassbooksDto) {
        return passbookService.getmyPassbooks(getMyPassbooksDto.getAccountId());
    }
}
