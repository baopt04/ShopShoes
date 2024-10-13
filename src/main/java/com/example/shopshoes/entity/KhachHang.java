package com.example.shopshoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Khach_Hang")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

public class KhachHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Khach_Hang")
    private int idKhachHang;

    @Column(name = "Tai_Khoan")
    private String taiKhoan;

    @Column(name = "Mat_Khau")
    private String matKhau;

    @Column(name = "Ho_Ten")
    private String hoTen;

    @Column(name = "Ngay_Sinh")
    private LocalDateTime ngaySinh;

    @Column(name = "SDT")
    private String sdt;

    @Column(name = "Email")
    private String email;

    @Column(name = "Gioi_Tinh")
    private String gioiTinh;

    @Column(name = "Trang_Thai")
    private boolean trangThai;

}
