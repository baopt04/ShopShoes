package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.customer.ChangePasswordRequest;
import com.example.shopshoes.server.dto.response.account.AccountResponse;
import com.example.shopshoes.server.entity.Account;
import com.example.shopshoes.server.dto.response.employee.SimpleEmployeeResponse;

import java.util.List;


public interface AccountService {

    List<Account> findAll ();

    Account getOneByEmail(String email);

    AccountResponse getAccountUserByIdBill( String idBill );

    List<SimpleEmployeeResponse> getAllSimpleEntityEmployess();

    Account changePassword(ChangePasswordRequest request);

    Account getAccountById(String id);
}
