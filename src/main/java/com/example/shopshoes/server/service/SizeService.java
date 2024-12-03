package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.size.CreateSizeRequest;
import com.example.shopshoes.server.dto.request.size.FindSizeRequest;
import com.example.shopshoes.server.dto.request.size.UpdateSizeRequest;
import com.example.shopshoes.server.dto.response.SizeResponse;
import com.example.shopshoes.server.dto.response.size.GetSizeInProductDetail;
import com.example.shopshoes.server.entity.Size;
import jakarta.validation.Valid;

import java.util.List;


public interface SizeService {

    List<SizeResponse> findAll(final FindSizeRequest req);

    List<Size> getAll();

    Size create(@Valid final CreateSizeRequest req);

    Size update(@Valid final UpdateSizeRequest req);

    Boolean delete(String id);

    Size getOneById(String id);

    Size getOneByName(int name);
    List<GetSizeInProductDetail> getSizeInProductDetail();

}
