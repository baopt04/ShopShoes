package com.example.shopshoes.server.dto.response.user;

import org.springframework.beans.factory.annotation.Value;

public interface GetByAccountResponse {
    @Value("#{target.id}")
    String getId();
}
