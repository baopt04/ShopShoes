package com.example.shopshoes.server.dto.response.request.empolyee;

import ch.qos.logback.core.status.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseEmployeeRequest {
    private String fullName;

    private Long dateOfBirth;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private String avata;

    private Status status;

    private Integer points;

    private String id;

    private String citizenIdentity;
}