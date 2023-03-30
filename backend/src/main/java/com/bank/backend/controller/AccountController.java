package com.bank.backend.controller;

import com.bank.backend.dto.AccountCreateDto;
import com.bank.backend.dto.GetMyAccountsDto;
import com.bank.backend.dto.UpdateAccountDto;
import com.bank.backend.model.Account;
import com.bank.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/registeraccount")
    public Account registeraccount(@RequestBody AccountCreateDto accountCreateDto) {
        return accountService.createAccount(accountCreateDto);
    }

    @PostMapping("/getaccount")
    public Account getAccount(Integer accountId) {
        return accountService.findAccount(accountId);
    }

    @GetMapping("/getallaccounts")
    public List<Account> getallaccounts() {
        return accountService.fetchAllAccounts();
    }

    @PostMapping("/getmyaccounts")
    public List<Account> getmyaccounts(@RequestBody GetMyAccountsDto getMyAccountsDto) {
        return accountService.getmyaccounts(getMyAccountsDto.getEmail());
    }

    @PostMapping("/updateaccount")
    public Integer updateAccountStatus(@RequestBody UpdateAccountDto updateAccountDto) {
        return accountService.updateAccountStatus(updateAccountDto.getStatus(), updateAccountDto.getAccountId());
    }
}
