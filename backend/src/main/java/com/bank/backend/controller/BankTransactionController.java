package com.bank.backend.controller;

import com.bank.backend.dto.BankTransactionCreateDto;
import com.bank.backend.dto.GetMyTransactionsDto;
import com.bank.backend.model.BankTransaction;
import com.bank.backend.service.BankTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
public class BankTransactionController {

    @Autowired
    BankTransactionService bankTransactionService;

    @PostMapping("/transact")
    public BankTransaction registeraccount(@RequestBody BankTransactionCreateDto bankTransactionCreateDto) throws ParseException {
        return bankTransactionService.addTransaction(bankTransactionCreateDto);
    }

    @GetMapping("/getalltransactions")
    public List<BankTransaction> getallTransactions() {
        return bankTransactionService.fetchAllTransactions();
    }

    @PostMapping("/getmytransactions")
    public List<BankTransaction> getmytransactions(@RequestBody GetMyTransactionsDto getMyTransactionsDto) {
        return bankTransactionService.fetchMyTransactions(getMyTransactionsDto.getAccountId());
    }
}
