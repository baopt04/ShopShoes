package com.example.shopshoes.server.dto.request.color;

import com.example.shopshoes.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class FindColorRequest extends PageableRequest {

    private String code;

    private String name;

    private String status;
}
