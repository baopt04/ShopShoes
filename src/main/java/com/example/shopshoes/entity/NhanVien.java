package com.example.shopshoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Nhan_Vien")
public class NhanVien implements Serializable  , UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nhan_vien")
    private Integer id;
    @Column(name = "mat_khau")
    private String matKhau;
    @Column(name = "ho_ten")
    private String hoTen;
    @Column(name = "gioi_tinh")
    private String gioiTinh;
    @Column(name = "ngay_sinh")
    private Date ngaySinh;
    @Column(name = "dia_chi")
    private String diaChi;
    @Column(name = "email")
    private String email;
    @Column(name = "sdt")
    private String soDienThoai;
    @Column(name = "cccd")
    private String CCCD;
    @Column(name = "ngay_vao_lam")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayVaoLam;
    @Column(name = "ngay_tao" , nullable = false , updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date ngayTao;
    @Column(name = "ngay_cap_nhat")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date ngayCapNhat;
    @Column(name = "trang_thai")
    private Boolean trangThai;
    @Column(name = "anh")
    private String anh;
    @ManyToOne
    @JoinColumn(name = "Id_Chuc_Vu")
    private ChucVu chucVu;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(chucVu.getTenChucVu()));
    }

    @Override
    public String getPassword() {
        return matKhau;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
