package com.example.shopshoes.server.service.impl;

import com.example.shopshoes.server.dto.request.customer.ChangePasswordRequest;
import com.example.shopshoes.server.dto.response.account.AccountResponse;
import com.example.shopshoes.server.dto.response.employee.SimpleEmployeeResponse;
import com.example.shopshoes.server.entity.Account;
import com.example.shopshoes.server.infrastructure.constant.Message;
import com.example.shopshoes.server.infrastructure.exception.rest.RestApiException;
import com.example.shopshoes.server.repository.AccountRepository;
import com.example.shopshoes.server.repository.UserReposiory;
import com.example.shopshoes.server.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserReposiory userReposiory;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account getOneByEmail(String email) {
        Account account = accountRepository.getOneByEmail(email);
        if (account == null) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return account;
    }

    @Override
    public AccountResponse getAccountUserByIdBill(String idBill) {
        return accountRepository.getAccountUserByIdBill(idBill);
    }

    @Override
    public List<SimpleEmployeeResponse> getAllSimpleEntityEmployess() {
        return accountRepository.getAllSimpleEntityEmployess();
    }

    @Override
    public Account changePassword(ChangePasswordRequest request) {
        Optional<Account> optional = accountRepository.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException("Tài khoản không tồn tại");
        }
        if(!request.getNewPassword().equals(request.getConfirmPassword())){
            throw new RestApiException("Mật khẩu không khớp");
        }
        if (passwordEncoder.matches(request.getNewPassword(), optional.get().getPassword())) {
            throw new RestApiException("Mật khẩu giống với trước");
        }
        Account account = optional.get();
        account.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return accountRepository.save(account);
    }

    @Override
    public Account getAccountById(String id) {
        Optional<Account> optional = accountRepository.findById(id);
        if(!optional.isPresent()){
            throw new RestApiException("Tài khoản không tồn tại");
        }
        return optional.get();
    }


}