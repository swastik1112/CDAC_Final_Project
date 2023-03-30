package com.bank.backend.repository;

import com.bank.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findById(Integer accountId);

    Optional<Account> findFirstByUserEmailAndAccounttype(String email, String accountType);

    @Query(value = "SELECT * FROM Account a WHERE email = :email", nativeQuery = true)
    List<Account> findByEmail(@Param("email") String email);

    @Modifying
    @Query(value = "update account set status=:status where id= :accountId", nativeQuery = true)
    Integer updateAccountStatus(@Param("status") String status, @Param("accountId") Integer accountId);
}
