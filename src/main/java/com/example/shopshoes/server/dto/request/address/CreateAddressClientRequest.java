package com.example.shopshoes.server.dto.request.address;

import com.example.shopshoes.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAddressClientRequest {
    private String idAccount;
    private String line;

    private String district;

    private String province;

    private String ward;

    private Integer provinceId;

    private Integer districtId;

    private String wardCode;

    private String fullName;

    private String phoneNumber;

    private Status status;

}
