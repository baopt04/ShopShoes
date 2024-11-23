package com.example.shopshoes.server.dto.response.request.address;

import ch.qos.logback.core.status.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindAddressRequest extends PageableRequest {

    private String line;

    private String district;

    private String province;

    private String ward;

    private Status status;

    private String id_user;

}