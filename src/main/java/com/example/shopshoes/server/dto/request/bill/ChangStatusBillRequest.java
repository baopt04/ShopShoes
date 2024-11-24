package com.example.shopshoes.server.dto.request.bill;

import com.example.shopshoes.server.infrastructure.constant.StatusMethod;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ChangStatusBillRequest {

    @NotEmpty
    private String actionDescription;

    private StatusMethod method;

    private String totalMoney;

     private  boolean statusCancel = false;

}
