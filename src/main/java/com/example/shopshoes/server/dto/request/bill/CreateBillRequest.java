package com.example.shopshoes.server.dto.request.bill;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBillRequest {

    private String idUser;

    private String name;

    private String phoneNumber;

    private String address;
}
