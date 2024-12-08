package com.example.shopshoes.server.service.impl;

import com.example.shopshoes.server.entity.PromotionProductDetail;
import com.example.shopshoes.server.repository.PromotionProductDetailRepository;
import com.example.shopshoes.server.service.PromotionProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PromotionProductDetailServiceImpl implements PromotionProductDetailService {
    @Autowired
    private PromotionProductDetailRepository promotionProductDetailRepository;
    @Override
    public PromotionProductDetail getByProductDetailAndPromotion(String idProductDetail, String idPromotion) {
        return promotionProductDetailRepository.getByProductDetailAndPromotion(idProductDetail,idPromotion);
    }
}
