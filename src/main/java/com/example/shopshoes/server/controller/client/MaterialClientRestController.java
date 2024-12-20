package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.MaterialService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/material")
public class MaterialClientRestController {
    @Autowired
    private MaterialService materialService;
    @GetMapping("/in-product-detail")
    public ResponseObject getMaterialInProductDetail() {
        return new ResponseObject(materialService.getMaterialInProductDetail());
    }
}
