package com.bank.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "account")
@Getter
@Setter
public class
Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer accountId;

    @Column(name = "accounttype")
    private String accounttype;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "status")
    private String status;
}
