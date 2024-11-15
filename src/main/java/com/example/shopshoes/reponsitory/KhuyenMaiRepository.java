package com.example.shopshoes.reponsitory;

import com.example.shopshoes.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai,Integer> {

    @Query(value = "select * from Khuyen_Mai  where Loai_Khuyen_Mai like ?1", countQuery = "select count(*) from KhuyenMai where loaiKhuyenMai like ?1", nativeQuery = true)
    Page<KhuyenMai> PageByLoaiKhuyenMai(String loaiKM,Pageable pageable);

    @Query(value = "select * from Khuyen_Mai  where Loai_Khuyen_Mai like ?1", nativeQuery = true)
    List<KhuyenMai> findAllByLoaiKhuyenMai(String loaiKM);

    @Query("select km from KhuyenMai km where km.tenKhuyenMai like %:tenKM%")
    List<KhuyenMai> findAllByTen(String tenKM);

    @Query("select hkh from KhuyenMai hkh  where hkh.trangThai=false ")
    List<KhuyenMai> findAllByTrangThaiFalse();

    @Query("select hkh from KhuyenMai hkh  where hkh.trangThai=false ")
    Page<KhuyenMai> PageByTrangThaiFalse(Pageable pageable);

    @Query("select hkh from KhuyenMai hkh  where hkh.trangThai=true ")
    List<KhuyenMai> findAllByTrangThaiTrue();

    @Query("select hkh from KhuyenMai hkh  where hkh.trangThai=true ")
    Page<KhuyenMai> PageByTrangThaiTrue(Pageable pageable);

    boolean existsByTenKhuyenMai(String tenKhuyenMai);

    @Query("select kh from KhuyenMai kh  where kh.loaiKhuyenMai like %:timkiem%  or kh.tenKhuyenMai like %:timkiem% ")
    List<KhuyenMai> timkiemKM(String timkiem);

}
