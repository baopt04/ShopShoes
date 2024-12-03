package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Size;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Size.class)
public interface SizeResponse extends BaseResponse {
}
