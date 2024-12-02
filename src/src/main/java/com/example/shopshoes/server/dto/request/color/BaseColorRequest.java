package com.example.shopshoes.server.dto.request.color;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public abstract class BaseColorRequest {

    @NotBlank(message = "Vui lòng không để trống")
    private String code;

    @NotBlank(message = "Vui lòng không để trống")
    private String name;

    @NotBlank(message = "Vui lòng không để trống")
    private String status;
}
