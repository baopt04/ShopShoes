package com.example.shopshoes.server.dto.request.customer;

import com.example.shopshoes.server.infrastructure.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Phuong Oanh
 */
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
