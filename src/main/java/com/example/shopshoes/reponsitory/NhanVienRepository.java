package com.example.shopshoes.reponsitory;

import com.example.shopshoes.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien,Integer> {

    @Query(value = "select * from Nhan_Vien  where ID_Nhan_Vien like ?1", nativeQuery = true)
    NhanVien findByIdNhanVien(int idNv);

}
