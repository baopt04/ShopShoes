package com.example.shopshoes.server.dto.response;

import com.example.shopshoes.server.dto.response.base.BaseResponse;
import com.example.shopshoes.server.entity.Category;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Category.class)
public interface CategoryResponse extends BaseResponse {

}
