package com.example.shopshoes.server.dto.request.billdetail;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class BillDetailRequest {

    @NotEmpty
    private String idBill;

    private String status;
}
