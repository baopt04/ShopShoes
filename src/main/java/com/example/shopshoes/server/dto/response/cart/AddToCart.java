package com.example.shopshoes.server.dto.response.cart;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AddToCart {
    String idAccount;
    private String idProductDetail;
    private Integer quantity;
    private BigDecimal price;
}
