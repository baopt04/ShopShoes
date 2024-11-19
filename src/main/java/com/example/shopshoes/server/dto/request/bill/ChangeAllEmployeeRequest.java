package com.example.shopshoes.server.dto.request.bill;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class ChangeAllEmployeeRequest {

    @NotNull
    private List<String> ids;

    @NotEmpty
    private String idEmployee;

}
