package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Color;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Color.class)
public interface ColorResponse extends BaseResponse {

    @Value("#{target.code}")
    String getCode();
}
