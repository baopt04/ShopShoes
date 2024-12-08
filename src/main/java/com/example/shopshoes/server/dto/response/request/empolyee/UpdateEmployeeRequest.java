package com.example.shopshoes.server.dto.response.request.empolyee;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateEmployeeRequest extends BaseEmployeeRequest {
    private String id;

    private String password;

    private String email;

}