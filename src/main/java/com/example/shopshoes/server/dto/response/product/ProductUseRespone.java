package com.example.shopshoes.server.dto.response.product;


import org.springframework.beans.factory.annotation.Value;

public interface ProductUseRespone {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.nameProduct}")
    String getName();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.code}")
    String getCode();


}
