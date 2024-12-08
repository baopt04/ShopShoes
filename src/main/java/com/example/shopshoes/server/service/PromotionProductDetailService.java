package com.example.shopshoes.server.service;


import com.example.shopshoes.server.entity.PromotionProductDetail;

public interface PromotionProductDetailService {
    PromotionProductDetail getByProductDetailAndPromotion(String idProductDetail, String idPromotion);
}
