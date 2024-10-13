package com.example.shopshoes.reponsitory;


import com.example.shopshoes.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang,Integer> {

    @Query("select kh from KhachHang kh where kh.idKhachHang = :id")
    KhachHang findByid(@Param("id") int id);

    @Query("select kh from KhachHang kh  where kh.trangThai=false ")
    List<KhachHang> findAllByTrangThaiFalse();

    @Query("select kh from KhachHang kh  where kh.trangThai=false ")
    Page<KhachHang> PageByTrangThaiFalse(Pageable pageable);

    @Query("select kh from KhachHang kh  where kh.trangThai=true ")
    List<KhachHang> findAllByTrangThaiTrue();

    @Query("select kh from KhachHang kh  where kh.trangThai=true ")
    Page<KhachHang> PageByTrangThaiTrue(Pageable pageable);

    @Query("select kh from KhachHang kh where kh.trangThai=false and ( concat('', kh.idKhachHang) like %:timkiem% or kh.hoTen like %:timkiem% or kh.email like %:timkiem%)")
    List<KhachHang> timkiemfalse(String timkiem);

    @Query("select kh from KhachHang kh  where  kh.trangThai=true and ( concat('', kh.idKhachHang) like %:timkiem% or kh.hoTen like %:timkiem% or kh.email like %:timkiem%)")
    List<KhachHang> timkiemtrue(String timkiem);


    @Query("select kh from KhachHang kh where kh.trangThai = true and (concat('', kh.idKhachHang) like %:timkiem% or kh.hoTen like %:timkiem% or kh.email like %:timkiem%)")
    Page<KhachHang> Pagetimkiemtrue(@Param("timkiem") String timkiem, Pageable pageable);


    @Query("select kh from KhachHang  kh where  kh.trangThai=true and (kh.taiKhoan like %:username% and kh.email like %:email%)")
    KhachHang quenMatKhau(String username, String email);

    @Query("select kh from KhachHang  kh where  kh.trangThai=true and (kh.taiKhoan like %:username% or kh.email like %:username%)")
    Optional<KhachHang> getKhachHangByTaiKhoan(String username);

}
