package com.example.shopshoes.server.service.impl;

import com.example.shopshoes.server.dto.response.billhistory.BillHistoryResponse;
import com.example.shopshoes.server.entity.BillHistory;
import com.example.shopshoes.server.repository.BillHistoryRepository;
import com.example.shopshoes.server.service.BillHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BillHistoryServiceImpl implements BillHistoryService {

    @Autowired
    private BillHistoryRepository billHistoryRepository;

    @Override
    public List<BillHistoryResponse> findAllByIdBill(String idBill) {
        return billHistoryRepository.findAllByIdBill(idBill);
    }
    @Override
    public List<BillHistory> getBillHistoryByIdBill(String idBill) {
        return billHistoryRepository.getBillHistoryByIdBill(idBill);
    }
}
