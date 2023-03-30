package com.bank.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BeneficiaryCreateDto {
    String beneficiaryName;
    String beneficiaryEmail;
    Integer beneficiaryAccount;
    Integer senderAccount;
}
