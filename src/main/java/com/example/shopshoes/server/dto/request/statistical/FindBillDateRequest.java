package com.example.shopshoes.server.dto.request.statistical;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindBillDateRequest {
    private Long startDate;

    private Long endDate;
}
