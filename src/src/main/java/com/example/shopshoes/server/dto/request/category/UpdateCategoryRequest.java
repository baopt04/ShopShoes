package com.example.shopshoes.server.dto.request.category;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateCategoryRequest extends BaseCategoryRequest{

    private String id;
}
