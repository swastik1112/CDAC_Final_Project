package com.bank.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "beneficiary")
@Getter
@Setter
public class Beneficiary implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer beneficiaryId;

    @Column(name = "beneficiary_name")
    private String beneficiaryName;

    @Column(name = "beneficiary_email")
    private String beneficiaryEmail;

    @ManyToOne
    @JoinColumn(name = "beneficiary_account")
    private Account beneficiaryAccount;

    @ManyToOne
    @JoinColumn(name = "sender_account")
    private Account senderAccount;
}
