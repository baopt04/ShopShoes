package com.example.shopshoes.server.dto.request.sole;

import com.example.shopshoes.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class FindSoleRequest extends PageableRequest {

    private String name;

    private String status;
}
