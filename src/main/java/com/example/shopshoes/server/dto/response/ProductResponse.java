package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.entity.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Product.class)
public interface ProductResponse  {

    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.nameProduct}")
    String getName();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.totalQuantity}")
    Integer getTotalQuantity();

}
