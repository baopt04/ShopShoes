package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.VoucherService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/voucher")
public class VoucherClientRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/{code}")
    public ResponseObject getByCode(@PathVariable("code") String code) {
        return new ResponseObject(voucherService.getByCode(code));
    }
    @GetMapping("/account/{idAccount}")
    public ResponseObject getVoucherByIdAccount() {
        return new ResponseObject(voucherService.getVoucherByIdAccount());
    }
    @GetMapping("/list")
    public ResponseObject getListVoucher() {
        return new ResponseObject(voucherService.getAllHaveQuantity());
    }
}
