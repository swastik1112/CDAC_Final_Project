package com.bank.backend.controller;

import com.bank.backend.dto.GetMyLoansDto;
import com.bank.backend.dto.LoanCreateDto;
import com.bank.backend.dto.UpdateLoanDto;
import com.bank.backend.model.Loan;
import com.bank.backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
public class LoanController {

    @Autowired
    LoanService loanService;

    @PostMapping("/registerloan")
    public Loan registerloan(@RequestBody LoanCreateDto loanCreateDto) throws ParseException {
        return loanService.addLoan(loanCreateDto);
    }

    @GetMapping("/getallloans")
    public List<Loan> getallloans() {
        return loanService.fetchAllLoan();
    }

    @PostMapping("/getmyloans")
    public List<Loan> getmyloans(@RequestBody GetMyLoansDto getMyLoansDto) {
        return loanService.getmyloans(getMyLoansDto.getAccountId());
    }

    @PostMapping("/updateloan")
    public Integer updateLoanStatus(@RequestBody UpdateLoanDto updateLoanDto) {
        return loanService.updateLoanStatus(updateLoanDto.getStatus(), updateLoanDto.getLoanId());
    }
}
