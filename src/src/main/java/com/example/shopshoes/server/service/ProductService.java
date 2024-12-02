package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.product.CreateProductRequest;
import com.example.shopshoes.server.dto.request.product.FindProductRequest;
import com.example.shopshoes.server.dto.request.product.FindProductUseRequest;
import com.example.shopshoes.server.dto.request.product.UpdateProductRequest;
import com.example.shopshoes.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shopshoes.server.dto.response.ProductDetailReponse;
import com.example.shopshoes.server.dto.response.ProductResponse;
import com.example.shopshoes.server.dto.response.product.ProductUseRespone;
import com.example.shopshoes.server.entity.Product;
import jakarta.validation.Valid;

import java.util.List;


public interface ProductService {

    List<ProductResponse> findAll(final FindProductRequest req);

    List<String> fillAllByName(String name);

    Product create(@Valid final CreateProductRequest req);

    Product update(@Valid final UpdateProductRequest req);

    Boolean delete(String id);

    Product getOneById(String id);

    List<ProductUseRespone> getProductUse(FindProductUseRequest request);

    List<ProductDetailReponse> getAllProduct(FindProductDetailRequest req);
}
