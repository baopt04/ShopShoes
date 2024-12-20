package com.example.shopshoes.server.dto.response.promotion;


import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Promotion;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = Promotion.class)
public interface PromotionRespone extends BaseResponse {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();
    @Value("#{target.value}")
    BigDecimal getValue();
    @Value("#{target.startDate}")
    Long getStartDate();
    @Value("#{target.endDate}")
    Long getEndDate();
    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.createdDate}")
    Long getCreateDate();




}
