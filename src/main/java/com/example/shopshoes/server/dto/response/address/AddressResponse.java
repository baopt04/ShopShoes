package com.example.shopshoes.server.dto.response.address;

import com.example.shopshoes.server.entity.Address;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = {Address.class})
public interface AddressResponse {
    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.id}")
    String getId();
    @Value("#{target.line}")
    String getLine();

    @Value("#{target.district}")
    String getDistrict();

    @Value("#{target.province}")
    String getProvince();

    @Value("#{target.ward}")
    String getWard();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.createdDate}")
    Long getCreatedDate();

    @Value("#{target.lastModifiedDate}")
    Long getLastModifiedDate();

}