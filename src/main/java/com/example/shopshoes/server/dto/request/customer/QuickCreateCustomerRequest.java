package com.example.shopshoes.server.dto.request.customer;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class QuickCreateCustomerRequest {

    @NotBlank(message = "Vui lòng không để trống tên")
    private String fullName;

    @NotBlank(message = "Vui lòng không để trống số điện thoại")
    private String phoneNumber;

    private String email;

    private Boolean gender;
}