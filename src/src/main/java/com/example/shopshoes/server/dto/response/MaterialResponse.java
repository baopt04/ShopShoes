package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Material;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Material.class)
public interface MaterialResponse extends BaseResponse {

}
