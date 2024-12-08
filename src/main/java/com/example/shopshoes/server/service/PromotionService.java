package com.example.shopshoes.server.service;


import com.example.shopshoes.server.dto.request.promotion.CreatePromotionRequest;
import com.example.shopshoes.server.dto.request.promotion.FindPromotionRequest;
import com.example.shopshoes.server.dto.request.promotion.UpdatePromotionRequest;
import com.example.shopshoes.server.dto.response.promotion.GetPromotionOfProductDetail;
import com.example.shopshoes.server.dto.response.promotion.PromotionByIdRespone;
import com.example.shopshoes.server.dto.response.promotion.PromotionByProDuctDetail;
import com.example.shopshoes.server.dto.response.promotion.PromotionRespone;
import com.example.shopshoes.server.entity.Promotion;

import java.util.List;

public interface PromotionService {
    List<PromotionRespone> getAll(FindPromotionRequest findPromotionRequest);
    Promotion add(CreatePromotionRequest request) throws Exception;
    Promotion update(UpdatePromotionRequest request);
    Promotion updateStatus(String id);
    Promotion getById(String id);
    List<Promotion> expiredVoucher();
    List<Promotion> startVoucher();
    PromotionByIdRespone getByIdPromotion(String id);
    List<PromotionByProDuctDetail> getByIdProductDetail(String id);

    GetPromotionOfProductDetail getPromotionOfProductDetail(String id);
}
