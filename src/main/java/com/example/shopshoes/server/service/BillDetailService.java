package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.billdetail.BillDetailRequest;
import com.example.shopshoes.server.dto.request.billdetail.CreateBillDetailRequest;
import com.example.shopshoes.server.dto.request.billdetail.RefundProductRequest;
import com.example.shopshoes.server.dto.response.billdetail.BillDetailResponse;
import com.example.shopshoes.server.entity.BillDetail;

import java.util.List;


public interface BillDetailService {

    List<BillDetailResponse> findAllByIdBill(BillDetailRequest request);
    List<BillDetailResponse> findAllByIdBill(String id);

    BillDetailResponse findBillById(String id);

    BillDetail refundProduct(RefundProductRequest request);

    String create(String idEmployees,CreateBillDetailRequest request);

    String update(String id, String idEmployees, CreateBillDetailRequest request);

    boolean delete(String id, String productDetail, String note, String idEmployees);
}