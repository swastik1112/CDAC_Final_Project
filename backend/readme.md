CREATE TABLE `bank-mgmt-sys`.`account` (
`id` INT NOT NULL AUTO_INCREMENT,
`accounttype` VARCHAR(255) NOT NULL,
`email` VARCHAR(255),
`balance` VARCHAR(255) NOT NULL, PRIMARY KEY(id), FOREIGN KEY(email) REFERENCES `USER`(email)
) ENGINE = InnoDB;

CREATE TABLE `bank-mgmt-sys`.`beneficiary` (
`id` INT NOT NULL AUTO_INCREMENT ,
`beneficiary_name` VARCHAR(255) NOT NULL ,
`beneficiary_email` VARCHAR(255) NOT NULL ,
`beneficiary_account` INT NOT NULL , PRIMARY KEY (`id`), FOREIGN KEY(beneficiary_email) REFERENCES `USER`(email),
FOREIGN KEY(beneficiary_account) REFERENCES `account`(id)) ENGINE = InnoDB;

CREATE TABLE `bank-mgmt-sys`.`card`(
`card_id` INT NOT NULL AUTO_INCREMENT,
`account_id` INT NOT NULL,
`card_type` VARCHAR(255) NOT NULL, PRIMARY KEY(`card_id`), FOREIGN KEY(account_id) REFERENCES `account`(id)
) ENGINE = InnoDB;

CREATE TABLE `bank-mgmt-sys`.`passbook` (
`passbook_id` INT NOT NULL AUTO_INCREMENT ,
`account_id` INT NOT NULL ,
`issued_date` DATE NOT NULL , PRIMARY KEY (`passbook_id`), FOREIGN KEY(account_id) REFERENCES `account`(id)
) ENGINE = InnoDB;

CREATE TABLE `bank-mgmt-sys`.`loan` (
`loan_id` INT NOT NULL AUTO_INCREMENT ,
`account_id` INT NOT NULL ,
`loan_type` INT NOT NULL ,
`loan_amount` DOUBLE NOT NULL ,
`loan_interest` DECIMAL NOT NULL ,
`loan_completion_date` DATE NOT NULL , PRIMARY KEY (`loan_id`), FOREIGN KEY(account_id) REFERENCES `account`(id)
) ENGINE = InnoDB;

CREATE TABLE `bank-mgmt-sys`.`bank_transaction`(
`transaction_id` INT NOT NULL,
`sender_account` INT NOT NULL,
`receiver_account` INT NOT NULL,
`description` TEXT NOT NULL,
`amount` DOUBLE NOT NULL,
`transaction_date` DATE NOT NULL, PRIMARY KEY(`transaction_id`), FOREIGN KEY(sender_account) REFERENCES `account`(id),
FOREIGN KEY(receiver_account) REFERENCES `account`(id)
) ENGINE = InnoDB;
----------------------------------------------------------------------------
register user login user - later add jwt add account add loan add card, remove card add beneficiary add passbook, update
passbook create debit transaction,credit transaction
