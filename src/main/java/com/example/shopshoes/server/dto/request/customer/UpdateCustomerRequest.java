package com.example.shopshoes.server.dto.request.customer;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UpdateCustomerRequest extends BaseCustomerRequest {
    private String id;

}