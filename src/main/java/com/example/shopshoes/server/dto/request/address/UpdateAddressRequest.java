package com.example.shopshoes.server.dto.request.address;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateAddressRequest extends BaseAddressRequest {

    private String id;
}