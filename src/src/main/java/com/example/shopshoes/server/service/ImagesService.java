package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.response.ImageResponse;

import java.util.List;

public interface ImagesService {

    List<ImageResponse> findAllByIdProductDetail(String id);
}
