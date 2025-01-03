package com.example.shopshoes.server.dto.response.bill;

import lombok.*;

import java.math.BigDecimal;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceItemResponse {
    private String name;
    private int quantity;
    private String priceVn;
    private String sum;
    private Integer promotion;
    private String priceBeforePromotion;
    private String status;

}
