package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.infrastructure.poin.ConfigPoin;
import com.example.shopshoes.server.util.ResponseObject;
import com.example.shopshoes.server.util.payMent.Config;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin/poin")
@RequiredArgsConstructor
public class PoinResController {

    @Autowired
    private  ConfigPoin configPoin;
    @GetMapping
    public ResponseObject detail(){
        return new ResponseObject(configPoin.readJsonFile());
    }
}
