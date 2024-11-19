package com.example.shopshoes.server.service;

import com.example.shose.server.dto.response.cart.AddToCart;
import com.example.shose.server.dto.response.cart.ListCart;
import com.example.shose.server.entity.Cart;
import com.example.shose.server.entity.CartDetail;

import java.util.List;

public interface CartService {

    Cart addToCart(AddToCart listAddToCart);
    List<ListCart> getListCart(String idAccount);
    Integer quantityInCart(String idACcount);




}