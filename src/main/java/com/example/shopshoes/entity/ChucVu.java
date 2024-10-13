package com.example.shopshoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "Chuc_Vu")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

public class ChucVu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Chuc_Vu")
    private int idChucVu;

    @Column(name = "Ma_CV")
    private String maCV;

    @Column(name = "Ten_CV")
    private String tenCV;

    @Column(name = "Trang_Thai")
    private boolean trangThai;

}
