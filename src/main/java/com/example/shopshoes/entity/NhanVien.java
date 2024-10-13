package com.example.shopshoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@Table(name = "Nhan_Vien")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Nhan_Vien")
    private int idNhanVien;

    @Column(name = "Tai_Khoan")
    private String taiKhoan;

    @Column(name = "Mat_Khau")
    private String matKhau;

    @Column(name = "Ho_Ten")
    private String hoTen;

    @Column(name = "Gioi_Tinh")
    private String gioTinh;

    @Column(name = "Ngay_Sinh")
    private Date ngaySinh;

    @Column(name = "Dia_Chi")
    private String diaChi;

    @Column(name = "Email")
    private String email;

    @Column(name = "SDT")
    private String sdt;

    @Column(name = "CCCD")
    private String cccd;

    @Column(name = "Trang_Thai")
    private boolean trangThai;

    @Column(name = "Anh")
    private  String anh;

    
    @Column(name = "Ngay_Vao_Lam")
    private  Date ngayVaoLam;

    
    @Column(name = "Ngay_Tao")
    private  Date ngayTao;

    
    @Column(name = "Ngay_Cap_Nhat")
    private  Date ngayCapNhap;

    @ManyToOne
    @JoinColumn(name = "Id_Chuc_Vu")
    private ChucVu chucVu;


}
