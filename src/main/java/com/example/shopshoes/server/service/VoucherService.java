package com.example.shopshoes.server.service;


import com.example.shopshoes.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shopshoes.server.dto.request.voucher.FindVoucherRequest;
import com.example.shopshoes.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shopshoes.server.dto.response.voucher.VoucherRespone;
import com.example.shopshoes.server.entity.Voucher;
import com.example.shopshoes.server.infrastructure.exception.rest.RestApiException;

import java.util.List;

public interface VoucherService {

    List<VoucherRespone> getAll(FindVoucherRequest findVoucherRequest);
    List<Voucher> findAll();
    List<Voucher> getAllHaveQuantity();
    Voucher add(CreateVoucherRequest request) throws RestApiException;
    Voucher update(UpdateVoucherRequest request) throws RestApiException;
    Voucher updateStatus(String id) throws RestApiException;
    Voucher updateStatusQuantity(String id) throws RestApiException;
    Boolean delete(String id);
    Voucher getById(String id);
    List<Voucher> expiredVoucher();
    List<Voucher> startVoucher();
    Voucher getByCode(String code);

    List<Voucher> getVoucherByIdAccount();

    VoucherRespone getVoucherByMinimum(int minimum);
}
