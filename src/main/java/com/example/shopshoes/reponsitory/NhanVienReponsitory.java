package com.example.shopshoes.reponsitory;

import com.example.shopshoes.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NhanVienReponsitory extends JpaRepository<NhanVien, Integer> {
    Optional<NhanVien> findByEmail(String email);
}
