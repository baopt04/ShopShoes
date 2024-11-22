package com.example.shopshoes.server.dto.request.product;


import com.example.shose.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindProductUseRequest extends PageableRequest {

    private String keyword;

}