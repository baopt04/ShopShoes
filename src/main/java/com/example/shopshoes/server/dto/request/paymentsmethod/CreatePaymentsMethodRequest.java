package com.example.shopshoes.server.dto.request.paymentsmethod;

import com.example.shopshoes.server.infrastructure.constant.StatusMethod;
import com.example.shopshoes.server.infrastructure.constant.StatusPayMents;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
public class CreatePaymentsMethodRequest {

    private String actionDescription;

    private BigDecimal totalMoney;

    private StatusMethod method;

    private StatusPayMents status;

    private String transaction;

}
