package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.response.historypoin.HistoryPoinResponse;
import org.springframework.data.repository.query.Param;

import java.util.List;



public interface HistoryPoinService {

    List<HistoryPoinResponse> getAllHisToryPoinByIdUser(String idUser);
}
