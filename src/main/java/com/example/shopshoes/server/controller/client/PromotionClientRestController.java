package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.PromotionService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/client/promotion")
public class PromotionClientRestController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping("/ofProductDetail/{id}")
    public ResponseObject getPromotionOfProductDetail(@PathVariable("id")String id)  {
        return new ResponseObject(promotionService.getPromotionOfProductDetail(id));
    }
}
