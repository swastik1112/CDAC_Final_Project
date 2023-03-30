package com.bank.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "bank_transaction")
@Getter
@Setter
public class BankTransaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Integer bankTransactionId;

    @ManyToOne
    @JoinColumn(name = "sender_account")
    private Account senderAccount;

    @ManyToOne
    @JoinColumn(name = "receiver_account")
    private Account receiverAccount;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "transaction_date")
    private Date transactionDate;

}
