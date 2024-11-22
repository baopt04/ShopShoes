package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.ColorService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/color")
public class ColorClientRestController {
    @Autowired
    private ColorService colorService;

    @GetMapping("/in-product-detail")
    public ResponseObject getColorInProductDetail() {
        return new ResponseObject(colorService.getColorInProductDetail());
    }
}
