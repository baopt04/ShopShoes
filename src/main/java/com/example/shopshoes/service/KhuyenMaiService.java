package com.example.shopshoes.service;

import com.example.shopshoes.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface KhuyenMaiService {

    List<KhuyenMai> findAll();

    Page<KhuyenMai> pageKM(Pageable pageable);

    KhuyenMai addKM(KhuyenMai khuyenMai);

    void updateKM(KhuyenMai khuyenMai,int id);

    void deleteKM(int id);

    Optional<KhuyenMai> getOneByID(int id);

}
