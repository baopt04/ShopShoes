package com.example.shopshoes.server.dto.response;


import org.springframework.beans.factory.annotation.Value;

public interface GetCategorysToFindProductResponse {
        @Value("#{target.brand}")
        String getBrand();
        @Value("#{target.category}")
        String getIdProductDetail();

        @Value("#{target.sole}")
        String geSole();
        @Value("#{target.size}")
        String getSize();
        @Value("#{target.material}")
        String getMaterial();
        @Value("#{target.color}")
        String getColor();

}
