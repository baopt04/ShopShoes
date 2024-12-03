package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.SizeService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/size")
public class SizeClientRestController {
    @Autowired
    private SizeService sizeService;
    @GetMapping("/in-product-detail")
    public ResponseObject getSizeInProductDetail() {
        return new ResponseObject(sizeService.getSizeInProductDetail());
    }
}
