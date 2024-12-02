package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.category.CreateCategoryRequest;
import com.example.shopshoes.server.dto.request.category.FindCategoryRequest;
import com.example.shopshoes.server.dto.request.category.UpdateCategoryRequest;
import com.example.shopshoes.server.dto.response.CategoryResponse;
import com.example.shopshoes.server.dto.response.category.GetCategoryInProductDetail;
import com.example.shopshoes.server.entity.Category;
import jakarta.validation.Valid;

import java.util.List;


public interface CategoryService {
    List<Category> getAll();

    List<CategoryResponse> getList(FindCategoryRequest req);

    Category create(@Valid final CreateCategoryRequest req);

    Category update(@Valid final UpdateCategoryRequest req);

    Boolean delete(String id);

    Category getOneById(String id);
    List<GetCategoryInProductDetail> getCategoryInProductDetail();
}
