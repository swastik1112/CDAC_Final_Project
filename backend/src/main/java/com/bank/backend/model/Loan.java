package com.bank.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "loan")
@Getter
@Setter
public class Loan implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    private Integer loanId;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account accountId;

    @Column(name = "loan_type")
    private String loanType;

    @Column(name = "loan_amount")
    private Double loanAmount;

    @Column(name = "loan_interest")
    private Double loanInterest;

    @Column(name = "loan_completion_date")
    private Date loanCompletionDate;

    @Column(name = "status")
    private String status;
}
