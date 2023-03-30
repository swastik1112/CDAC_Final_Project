package com.bank.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BankTransactionCreateDto {
    Integer senderAccount;
    Integer receiverAccount;
    String description;
    Double amount;
    String transactionDate;
}
