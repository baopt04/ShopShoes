package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.dto.response.cart.AddToCart;
import com.example.shopshoes.server.infrastructure.session.ShoseSession;
import com.example.shopshoes.server.service.CartService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartClientRestController {

    @Autowired
    private CartService cartService;

    @Autowired
    private ShoseSession shoseSession;

    @PostMapping("")
    public ResponseObject addCart(@RequestBody AddToCart listAddToCart) {
        return new ResponseObject(cartService.addToCart(listAddToCart));
    }

    @GetMapping("/{idAccount}")
    public ResponseObject getListCart(@PathVariable("idAccount") String idAccount) {
        return new ResponseObject(cartService.getListCart(idAccount));
    }

    @GetMapping("/quantityInCart/{idAccount}")
    public ResponseObject getQuantityInCart(@PathVariable("idAccount") String idAccount) {
        return new ResponseObject(cartService.quantityInCart(idAccount));
    }


}
