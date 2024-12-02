package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.response.billhistory.BillHistoryResponse;
import com.example.shopshoes.server.entity.BillHistory;

import java.util.List;


public interface BillHistoryService {

    List<BillHistoryResponse> findAllByIdBill(String idBill);

    List<BillHistory> getBillHistoryByIdBill(String idBill);

}
