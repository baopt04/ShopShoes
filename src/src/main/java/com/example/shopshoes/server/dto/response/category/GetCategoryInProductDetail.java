package com.example.shopshoes.server.dto.response.category;

import org.springframework.beans.factory.annotation.Value;


public interface GetCategoryInProductDetail {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.name}")
    String getName();
}
