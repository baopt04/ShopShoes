package com.example.shopshoes.server.dto.request.bill;

import com.example.shopshoes.server.dto.request.bill.billcustomer.BillDetailOnline;
import com.example.shopshoes.server.infrastructure.constant.StatusMethod;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ChangStatusBillRequest {

    @NotEmpty
    private String actionDescription;

    private StatusMethod method;

    private String totalMoney;

     private  boolean statusCancel = false;
    private List<BillDetailOnline> billDetail;
    private String paymentMethod;
}
