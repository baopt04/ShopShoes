package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.PaymentsMethodService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/client/payment-method")
public class PaymentMethodClientRestController {

    @Autowired
    private PaymentsMethodService paymentsMethodService;

    @GetMapping("/byBill/{idBill}")
    public ResponseObject getByIdBill(@PathVariable("idBill") String idBill) {
        return new ResponseObject(paymentsMethodService.findByBill(idBill));
    }


}
