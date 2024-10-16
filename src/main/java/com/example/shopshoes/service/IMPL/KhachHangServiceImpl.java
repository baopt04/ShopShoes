package com.example.shopshoes.service.IMPL;


import com.example.shopshoes.entity.KhachHang;
import com.example.shopshoes.reponsitory.KhachHangRepository;
import com.example.shopshoes.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    KhachHangRepository khachHangRepository;

    @Override
    public KhachHang findByID(int id) {
        return khachHangRepository.findByid(id);
    }

    @Override
    public List<KhachHang> findAllByTrangThaiTrue() {
        return khachHangRepository.findAllByTrangThaiTrue();
    }

    @Override
    public void save(KhachHang khachHang) {
        khachHangRepository.save(khachHang);
    }

    @Override
    public void deleteById(int id) {
        if (id > 0) {
            // Kiểm tra xem khách hàng có tồn tại không
            if (khachHangRepository.existsById(id)) {
                khachHangRepository.deleteById(id);
            }
        } else {

        }
    }
}
