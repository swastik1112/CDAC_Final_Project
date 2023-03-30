package com.bank.backend.controller;

import com.bank.backend.configuration.CustomGrantedAuthority;
import com.bank.backend.configuration.JwtUtil;
import com.bank.backend.dto.JwtRequest;
import com.bank.backend.dto.JwtResponse;
import com.bank.backend.dto.UserDto;
import com.bank.backend.dto.UserLoginDto;
import com.bank.backend.model.User;
import com.bank.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private JwtUtil jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/registeruser")
    public User registeruser(@RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }

    @PostMapping("/loginuser")
    public User loginUser(@RequestBody UserLoginDto userLoginDto) {
        return userService.loginUser(userLoginDto);
    }

    @GetMapping("/getallusers")
    public List<User> getAllUsers() {
        return userService.fetchAllUsers();
    }

    @PostMapping("/authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add(new CustomGrantedAuthority(jwtRequest.getRole()));
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getEmail() + " " + jwtRequest.getRole(),
                            jwtRequest.getPassword(),
                            grantedAuthorities
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(jwtRequest.getEmail() + " " + jwtRequest.getRole());

        final String token =
                jwtUtility.generateToken(userDetails);

        User user = userService.findByEmailAndRole(jwtRequest.getEmail(), jwtRequest.getRole());
        return new JwtResponse(token, user.getEmail(), user.getRole(), user.getId(), user.getFirstname(), user.getLastname());
    }
}
