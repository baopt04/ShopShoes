package com.example.shopshoes.server.dto.response.size;


import org.springframework.beans.factory.annotation.Value;

public interface GetSizeInProductDetail {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.name}")
    String getName();
}
