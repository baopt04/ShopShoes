package com.example.shopshoes.server.dto.response.billhistory;

import com.example.shopshoes.server.entity.Bill;
import com.example.shopshoes.server.entity.BillHistory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = {Bill.class, BillHistory.class})
public interface BillHistoryResponse {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.status_bill}")
    String getStatusBill();

    @Value("#{target.created_date}")
    long getCreateDate();

    @Value("#{target.action_description}")
    String getActionDesc();

    @Value("#{target.full_name}")
    String getFullName();

}
