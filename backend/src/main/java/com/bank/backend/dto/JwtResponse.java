package com.bank.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String jwtToken;
    private String email;
    private String role;
    private Integer userId;
    private String firstname;
    private String lastname;
}
