package com.example.shopshoes.server.dto.response.cartdetail;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeQuantity {
    String idCartDetail;
    Integer quantity;
}
