package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.material.CreateMaterialRequest;
import com.example.shopshoes.server.dto.request.material.FindMaterialRequest;
import com.example.shopshoes.server.dto.request.material.UpdateMaterialRequest;
import com.example.shopshoes.server.dto.response.MaterialResponse;
import com.example.shopshoes.server.dto.response.material.GetMaterialInProductDetail;
import com.example.shopshoes.server.entity.Material;
import jakarta.validation.Valid;

import java.util.List;


public interface MaterialService {

    List<MaterialResponse> findAll(final FindMaterialRequest req);

    Material create(@Valid final CreateMaterialRequest req);

    Material update(@Valid final UpdateMaterialRequest req);

    Boolean delete(String id);

    Material getOneById(String id);

    List<GetMaterialInProductDetail> getMaterialInProductDetail();

}
