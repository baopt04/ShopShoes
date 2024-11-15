package com.example.shopshoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "San_Pham_Chi_Tiet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SanPhamChiTiet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_San_Pham_Chi_Tiet")
    private int idSanPhamChiTiet;

    @Column(name = "ID_San_Pham")
    private int idSanPham;

    @Column(name = "ID_Kich_Co")
    private int idKichCo;

    @Column(name = "ID_Mau_Sac")
    private int idMauSac;

    @Column(name = "ID_Chat_Lieu")
    private int idChatLieu;

    @Column(name = "Khoi_Luong", length = 20)
    private String khoiLuong;

    @Column(name = "Gia_Nhap", precision = 18, scale = 2)
    private BigDecimal giaNhap;

    @Column(name = "Gia_Ban", precision = 18, scale = 2)
    private BigDecimal giaBan;

    @Column(name = "So_Luong_Ton")
    private int soLuongTon;

    @Column(name = "Trang_Thai")
    private boolean trangThai;

    @Column(name = "Ghi_Chu", columnDefinition = "nvarchar(MAX)")
    private String ghiChu;

    @Column(name = "Ngay_Tao")
    private LocalDateTime ngayTao;

    @Column(name = "Ngay_Cap_Nhat")
    private LocalDateTime ngayCapNhat;
}
