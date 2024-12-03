package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Sole;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Sole.class)
public interface SoleResponse  extends BaseResponse {

}
