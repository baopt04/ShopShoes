package com.example.shopshoes.server.dto.request.bill;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class ChangeEmployeeRequest {

    @NotNull
    private String id;

    @NotNull
    private String idEmployee;
}
