package com.bank.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "passbook")
@Getter
@Setter
public class Passbook implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "passbook_id")
    private Integer passbookId;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account accountId;

    @Column(name = "issued_date")
    private Date issuedDate;
}
