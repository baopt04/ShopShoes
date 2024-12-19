package com.example.shopshoes.server.dto.response.productdetail;


import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface GetProductDetailByCategory {
    @Value("#{target.idProduct}")
    String getIdProduct();
    @Value("#{target.idProductDetail}")
    String getIdProductDetail();
    @Value("#{target.status}")
    String getStatus();
    @Value("#{target.codeColor}")
    String getCodeColor();
    @Value("#{target.nameSize}")
    String getNameSize();
    @Value("#{target.image}")
    String getImage();
    @Value("#{target.nameProduct}")
    String getNameProduct();
    @Value("#{target.price}")
    BigDecimal getPrice();
    @Value("#{target.valuePromotion}")
    String getValuePromotion();
    @Value("#{target.createdDate}")
    String getCreatedDate();
}
