package com.example.shopshoes.server.dto.request.employee;

import com.example.shopshoes.server.entity.Account;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UpdateEmployeeRequest extends BaseEmployeeRequest {
    private String id;
    private String password;
    private String email;

}