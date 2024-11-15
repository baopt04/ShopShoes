package com.example.shopshoes.service.IMPL;


import com.example.shopshoes.entity.KhuyenMai;
import com.example.shopshoes.reponsitory.KhuyenMaiRepository;
import com.example.shopshoes.reponsitory.NhanVienRepository;
import com.example.shopshoes.service.KhuyenMaiService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    KhuyenMaiRepository kmRepository;

    @Autowired
    NhanVienRepository nhanVienRepository;


    @Override
    public List<KhuyenMai> findAll() {
        return kmRepository.findAll();
    }

    @Override
    public Page<KhuyenMai> pageKM(Pageable pageable) {
        return kmRepository.findAll(pageable);
    }

    @Override
    public KhuyenMai addKM(KhuyenMai khuyenMai) {
        if(!kmRepository.existsById(khuyenMai.getIdKhuyenMai())){
            return kmRepository.save(khuyenMai);
        }else {

        }
            return null;
    }

    @Override
    public void updateKM(KhuyenMai khuyenMai, int id) {

        if (kmRepository.existsById((id))) {
            KhuyenMai existingKhuyenMai = kmRepository.findById((id)).orElse(null);

            if (existingKhuyenMai != null) {
                existingKhuyenMai.setTenKhuyenMai(khuyenMai.getTenKhuyenMai());
                existingKhuyenMai.setHinhThuc(khuyenMai.getHinhThuc());
                existingKhuyenMai.setMucGiamGia(khuyenMai.getMucGiamGia());
                existingKhuyenMai.setThoiGianBatDau(khuyenMai.getThoiGianBatDau());
                existingKhuyenMai.setThoiGianKetThuc(khuyenMai.getThoiGianKetThuc());
                existingKhuyenMai.setGhiChu(khuyenMai.getGhiChu());
                existingKhuyenMai.setSoLuong(khuyenMai.getSoLuong());
                existingKhuyenMai.setTrangThai(khuyenMai.isTrangThai());
                existingKhuyenMai.setDieuKienApDung(khuyenMai.getDieuKienApDung());
                existingKhuyenMai.setLoaiKhuyenMai(khuyenMai.getLoaiKhuyenMai());
                existingKhuyenMai.setNgayCapNhap(LocalDateTime.now());
                existingKhuyenMai.setNhanVien(khuyenMai.getNhanVien());
                kmRepository.save(existingKhuyenMai);
            }
        } else {
            throw new EntityNotFoundException("KhuyenMai Có ID: " + id + " Không Tồn Tại");
        }

    }


    @Override
    public void deleteKM(int id) {

        if (kmRepository.existsById(id)) {
            kmRepository.deleteById(id);
        } else {
            throw new RuntimeException("Khuyến mãi với ID: " + id + " không tồn tại.");
        }

    }

    @Override
    public Optional<KhuyenMai> getOneByID(int id) {
        return kmRepository.findById(id);
    }

}
