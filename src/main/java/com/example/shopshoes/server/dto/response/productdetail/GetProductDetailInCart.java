package com.example.shopshoes.server.dto.response.productdetail;


import org.springframework.beans.factory.annotation.Value;

public interface GetProductDetailInCart {
    @Value("#{target.idProductDetail}")
    String getIdProductDetail();

    @Value("#{target.price}")
    String getPrice();


}
