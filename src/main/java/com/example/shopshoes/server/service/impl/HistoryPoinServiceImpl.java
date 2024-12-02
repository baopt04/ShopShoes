package com.example.shopshoes.server.service.impl;

import com.example.shopshoes.server.dto.response.historypoin.HistoryPoinResponse;
import com.example.shopshoes.server.repository.HistoryPoinRepository;
import com.example.shopshoes.server.service.HistoryPoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class HistoryPoinServiceImpl implements HistoryPoinService {

    @Autowired
    private HistoryPoinRepository historyPoinRepository;


    @Override
    public List<HistoryPoinResponse> getAllHisToryPoinByIdUser(String idUser) {
        return historyPoinRepository.getAllHisToryPoinByIdUser(idUser);
    }
}
