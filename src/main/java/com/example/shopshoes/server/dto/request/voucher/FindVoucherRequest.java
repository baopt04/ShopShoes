package com.example.shopshoes.server.dto.request.voucher;

import com.example.shopshoes.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FindVoucherRequest extends PageableRequest {

    private String code;

    private String name;

    private BigDecimal value;

    private Integer quantity;

    private String status;
    private Long startDate;
    private Long endDate;

}
