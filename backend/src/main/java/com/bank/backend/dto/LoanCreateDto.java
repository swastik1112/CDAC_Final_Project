package com.bank.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanCreateDto {
    Integer accountId;
    String loanType;
    Double loanAmount;
    Double loanInterest;
    String loanCompletionDate;
    String status;
}
