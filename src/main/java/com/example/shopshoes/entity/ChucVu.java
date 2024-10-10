package com.example.shopshoes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Chuc_vu")
public class ChucVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_chuc_vu")
    private Integer id;
    @Column(name = "ma_CV")
    private String maChucVu;
    @Column(name = "ten_CV")
    @NotNull(message = "Tên không được trống")
    private String tenChucVu;
    @Column(name = "trang_thai")
    @NotNull(message = "Trạng thái không được trống")
    private Boolean trangThai;
}
