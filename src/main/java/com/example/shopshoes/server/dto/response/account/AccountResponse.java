package com.example.shopshoes.server.dto.response.account;

import com.example.shopshoes.server.entity.Account;
import com.example.shopshoes.server.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;


@Projection(types = {Account.class, User.class})
public interface AccountResponse {

    @Value("#{target.id}")
    UUID getId();

    @Value("#{target.fullName}")
    String getFullName();

    @Value("#{target.phoneNumber}")
    String getPhoneNumber();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.points}")
    int getPoints();

}
