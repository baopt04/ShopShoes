package com.example.shopshoes.server.dto.response.productdetail;


import com.example.shopshoes.server.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface GetProductDetail {
    @Value("#{target.idProduct}")
    String getIdProduct();
    @Value("#{target.idProductDetail}")
    String getIdProductDetail();
    @Value("#{target.status}")
    String getStatus();
    @Value("#{target.codeColor}")
    String getCodeColor();
    @Value("#{target.nameSize}")
    Integer getNameSize();
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
