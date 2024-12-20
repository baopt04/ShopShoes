package com.example.shopshoes.server.dto.response.address;


import org.springframework.beans.factory.annotation.Value;

public interface AddressAccountResponse {
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

    @Value("#{target.provinceId}")
    String getProvinceId();

    @Value("#{target.districtId}")
    String getDistrictId();

    @Value("#{target.wardCode}")
    String getWardCode();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.fullName}")
    String getFullName();

    @Value("#{target.phoneNumber}")
    String getPhoneNumber();

    @Value("#{target.userId}")
    String getUserId();

}