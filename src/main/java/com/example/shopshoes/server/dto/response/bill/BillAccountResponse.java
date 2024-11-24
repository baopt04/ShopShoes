package com.example.shopshoes.server.dto.response.bill;


import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.List;

public interface BillAccountResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.totalMoney}")
    BigDecimal getTotalMoney();

    @Value("#{target.statusBill}")
    String getStatusBill();
    @Value("#{target.billDetail}")
     String getBillDetail();

}
