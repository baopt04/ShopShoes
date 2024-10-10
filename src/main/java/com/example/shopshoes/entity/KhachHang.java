package com.example.shopshoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "khach_hang")
@Entity
public class KhachHang implements Serializable  , UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_khach_hang")
    private Integer id;
    @Column(name = "mat_khau")
    private String matKhau;
    @Column(name = "ho_ten")
    private String hoTen;
    @Column(name = "ngay_sinh")
    private Date ngaySinh;
    @Column(name = "SDT")
    private String soDienThoai;
    @Column(name = "email")
    private String email;
    @Column(name = "gioi_tinh")
    private String gioiTinh;
    @Column(name = "trang_thai")
    private Boolean trangThai;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "CUSTOMER");
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
