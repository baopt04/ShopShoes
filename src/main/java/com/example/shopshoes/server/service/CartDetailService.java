package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.response.cartdetail.ChangeQuantity;
import com.example.shopshoes.server.dto.response.cartdetail.ChangeSizeInCart;
import com.example.shopshoes.server.entity.CartDetail;

public interface CartDetailService {
    String changeSizeCartDetail(ChangeSizeInCart changeSize);
    Boolean deleteCartDetail(String id);
    String changeQuantity(ChangeQuantity changeQuantity);
     void deleteAllCart(String idAccount);
}
