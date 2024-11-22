package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.sole.CreateSoleRequest;
import com.example.shopshoes.server.dto.request.sole.FindSoleRequest;
import com.example.shopshoes.server.dto.request.sole.UpdateSoleRequest;
import com.example.shopshoes.server.dto.response.SoleResponse;
import com.example.shopshoes.server.dto.response.sole.GetSoleInProductDetail;
import com.example.shopshoes.server.entity.Sole;
import jakarta.validation.Valid;

import java.util.List;


public interface SoleService {

    List<SoleResponse> findAll (final FindSoleRequest req);

    Sole create (@Valid final CreateSoleRequest req);

    Sole update (@Valid final UpdateSoleRequest req);

    Boolean delete (String id);

    Sole getOneById (String id);
    List<GetSoleInProductDetail> getSoleInProductDetail();


}
