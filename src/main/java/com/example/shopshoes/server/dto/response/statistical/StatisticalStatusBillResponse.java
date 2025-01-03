package com.example.shopshoes.server.dto.response.statistical;

import org.springframework.beans.factory.annotation.Value;


public interface StatisticalStatusBillResponse {
    @Value("#{target.statusBill}")
    String getStatusBill();
    @Value("#{target.totalStatusBill}")
    Integer getTotalStatusBill();
}
