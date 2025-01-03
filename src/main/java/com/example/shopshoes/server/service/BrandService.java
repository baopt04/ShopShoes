package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.brand.CreateBrandRequest;
import com.example.shopshoes.server.dto.request.brand.FindBrandRequest;
import com.example.shopshoes.server.dto.request.brand.UpdateBrandRequest;
import com.example.shopshoes.server.dto.response.BrandResponse;
import com.example.shopshoes.server.dto.response.brand.GetBrandInProductDetail;
import com.example.shopshoes.server.entity.Brand;
import jakarta.validation.Valid;

import java.util.List;


public interface BrandService {

    List<BrandResponse> findAll(final FindBrandRequest req);

    Brand create( @Valid final CreateBrandRequest req);

    Brand update(@Valid final UpdateBrandRequest req);

    Boolean delete(String id);

    Brand getOneById(String id);
    List<GetBrandInProductDetail> getBrandInProductDetail();
}
