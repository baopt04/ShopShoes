package com.example.shopshoes.server.dto.response.request.customer;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FindCustomerRequest extends PageableRequest {
    private String fullName;

    private String email;

    private String phoneNumber;

    private String status;

    private Long startTime;

    private Long endTime;
}