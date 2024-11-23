package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.response.voucher.VoucherDetailCustomAtCountry;


public interface VoucherDetailService {

    VoucherDetailCustomAtCountry getVoucherDetailByIdBill( String idBill);
}
