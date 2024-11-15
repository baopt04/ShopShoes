package com.example.shopshoes.service;

import com.example.shopshoes.entity.KhachHang;

import java.util.List;


public interface KhachHangService {

    KhachHang findByID(int id);

    List<KhachHang> findAllByTrangThaiTrue();

    void save(KhachHang khachHang);

    void deleteById(int id);
}
