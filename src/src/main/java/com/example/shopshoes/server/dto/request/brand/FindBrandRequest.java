package com.example.shopshoes.server.dto.request.brand;

import com.example.shopshoes.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FindBrandRequest extends PageableRequest {

    private String name;

    private String status;
}
