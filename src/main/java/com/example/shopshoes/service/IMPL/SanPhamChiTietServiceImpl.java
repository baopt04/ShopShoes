package com.example.shopshoes.service.IMPL;


import com.example.shopshoes.entity.SanPhamChiTiet;
import com.example.shopshoes.reponsitory.SanPhamChiTietRepository;
import com.example.shopshoes.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {

    @Autowired
    SanPhamChiTietRepository sanPhamChiTietRepository;

    @Override
    public List<SanPhamChiTiet> findAll() {
        return sanPhamChiTietRepository.findAll();
    }
}
