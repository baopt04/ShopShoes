package com.example.shopshoes.server.dto.response.bill;

import org.springframework.beans.factory.annotation.Value;
public interface ListStatusRespone {

    @Value("#{target.status_bill}")
    String getStatus();

    @Value("#{target.quantity}")
    String getQuantity();

}
