package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Brand;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Brand.class)
public interface BrandResponse extends BaseResponse {
}
