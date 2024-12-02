package com.example.shopshoes.server.service.impl;

import com.example.shopshoes.server.entity.ScoringFormula;
import com.example.shopshoes.server.infrastructure.poin.ConfigPoin;
import com.example.shopshoes.server.infrastructure.poin.Poin;
import com.example.shopshoes.server.repository.ScoringFormulaRepository;
import com.example.shopshoes.server.service.PoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class PoinServiceImpl implements PoinService {

    @Autowired
    private ScoringFormulaRepository scoringFormulaRepository;

    @Override
    public ScoringFormula getDetailPoin() {
        List<ScoringFormula> scoringFormulas = scoringFormulaRepository.findAllByOrderByCreatedDateDesc();
        if (scoringFormulas.isEmpty()) {
            return ScoringFormula.builder().exchangeRatePoin(new BigDecimal(0)).exchangeRatePoin(new BigDecimal(0)).build();
        }
        return scoringFormulas.get(0);
    }
}
