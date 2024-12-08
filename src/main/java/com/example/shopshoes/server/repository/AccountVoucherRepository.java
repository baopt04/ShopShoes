package com.example.shopshoes.server.repository;

import com.example.shopshoes.server.entity.AccountVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountVoucherRepository extends JpaRepository<AccountVoucher,String> {
}
