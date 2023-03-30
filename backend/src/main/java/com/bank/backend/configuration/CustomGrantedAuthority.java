package com.bank.backend.configuration;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;


@AllArgsConstructor
@Data
public class CustomGrantedAuthority implements GrantedAuthority {

    String rolename;

    @Override
    public String getAuthority() {
        return rolename;
    }
}
