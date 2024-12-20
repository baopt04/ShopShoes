package com.example.shopshoes.server.dto.request.bill;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


import java.util.List;


@Getter
@Setter
public class ChangAllStatusBillByIdsRequest {

    @NotNull
    private List<String> ids;

    @NotEmpty
    private  String status;

    private String note;

}
