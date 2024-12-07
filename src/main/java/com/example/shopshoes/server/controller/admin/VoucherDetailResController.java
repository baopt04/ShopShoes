package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.repository.VoucherDetailRepository;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/admin/voucher-detail")
public class VoucherDetailResController {

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @GetMapping("/{idbill}")
    public ResponseObject getVoucherDetailByIdBill(@PathVariable("idbill") String idbill) {
        return new ResponseObject(voucherDetailRepository.getVoucherDetailByIdBill(idbill));
    }
}
