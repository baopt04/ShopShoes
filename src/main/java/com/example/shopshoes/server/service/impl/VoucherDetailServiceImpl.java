package com.example.shopshoes.server.service.impl;

import com.example.shopshoes.server.dto.response.voucher.VoucherDetailCustomAtCountry;
import com.example.shopshoes.server.reponsitory.VoucherDetailRepository;
import com.example.shopshoes.server.service.VoucherDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherDetailServiceImpl implements VoucherDetailService {
    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @Override
    public VoucherDetailCustomAtCountry getVoucherDetailByIdBill(String idBill) {
        return voucherDetailRepository.getVoucherDetailByIdBill(idBill);
    }
}
