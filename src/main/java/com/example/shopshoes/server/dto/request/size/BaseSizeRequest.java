package com.example.shopshoes.server.dto.request.size;

import com.example.shopshoes.server.infrastructure.constant.Status;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public abstract class BaseSizeRequest {

    private int name;

    private Status status;
}
