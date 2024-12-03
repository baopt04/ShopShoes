package com.example.shopshoes.server.dto.request.product;

import com.example.shopshoes.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class FindProductRequest extends PageableRequest {

    private String keyword;

    private String status;

    private int minQuantity;

    private  int maxQuantity;
}
