package com.example.shopshoes.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Khuyen_Mai")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

public class KhuyenMai {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Khuyen_Mai")
    private int idKhuyenMai;

    @Size(min = 6, message = "Tên phải lớn hơn hoặc bằng 6 kí tự")
    @Column(name = "Ten_Khuyen_Mai")
    private String tenKhuyenMai;

    @Column(name = "Hinh_Thuc")
    private String hinhThuc;

    @NotBlank(message = "Không để trống thông tin")
    @Min(value = 1, message = "chỉ chấp nhận 1-500000")
    @Max(value = 500000, message = "chỉ chấp nhận 1-500000")
    @Column(name = "Muc_Giam_Gia")
    private Long mucGiamGia;

    @NotBlank(message = "Không để trống thông tin")
    @Column(name = "Thoi_Gian_Bat_Dau")
    private LocalDateTime thoiGianBatDau;

    @NotBlank(message = "Không để trống thông tin")
    @Column(name = "Thoi_Gian_Ket_Thuc")
    private LocalDateTime thoiGianKetThuc;

    @Column(name = "Ghi_Chu")
    private String ghiChu;

    @Column(name = "So_Luong")
    private int soLuong;

    @Column(name = "Trang_Thai")
    private boolean trangThai;

    @Column(name = "Dieu_Kien_Ap_Dung")
    private String dieuKienApDung;

    @Column(name = "Loai_Khuyen_Mai")
    private String loaiKhuyenMai;

    @Column(name = "Ngay_Tao")
    private LocalDateTime ngayTao;

    @Column(name = "Ngay_Cap_Nhat")
    private LocalDateTime ngayCapNhap;

    @ManyToOne
    @JoinColumn(name = "ID_Nhan_Vien")
    private NhanVien nhanVien;

}
