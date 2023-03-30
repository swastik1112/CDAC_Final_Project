package com.bank.backend.controller;

import com.bank.backend.dto.BeneficiaryCreateDto;
import com.bank.backend.dto.GetMyBeneficiariesDto;
import com.bank.backend.model.Beneficiary;
import com.bank.backend.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
public class BenificiaryController {

    @Autowired
    BeneficiaryService beneficiaryService;

    @PostMapping("/addbeneficiary")
    public Beneficiary addbeneficiary(@RequestBody BeneficiaryCreateDto beneficiaryCreateDto) throws ParseException {
        return beneficiaryService.addBeneficiary(beneficiaryCreateDto);
    }

    @GetMapping("/fetchallbeneficiaries")
    public List<Beneficiary> fetchallbeneficiaries() {
        return beneficiaryService.fetchAllBeneficiary();
    }

    @PostMapping("/fetchmybeneficiaries")
    public List<Beneficiary> fetchmybeneficiaries(@RequestBody GetMyBeneficiariesDto getMyBeneficiariesDto) {
        return beneficiaryService.findMyBeneficiaries(getMyBeneficiariesDto.getAccountId());
    }
}
