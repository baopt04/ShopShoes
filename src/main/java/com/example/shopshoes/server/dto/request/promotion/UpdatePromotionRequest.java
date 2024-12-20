package com.example.shopshoes.server.dto.request.promotion;

import com.example.shopshoes.server.dto.request.productdetail.IdProductDetail;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class UpdatePromotionRequest extends BasePromotionRequest {
    private String id;
    private List<IdProductDetail> idProductDetails =new ArrayList<>();
}
