package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "voucher_detail")
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDetail extends PrimaryEntity {

    @Column(name = "befor_price")
    private BigDecimal beforPrice;

    @Column(name = "after_price")
    private BigDecimal afterPrice;

    @Column(name = "discount_price")
    private BigDecimal discountPrice;

    @ManyToOne
    @JoinColumn(name = "id_bill",referencedColumnName = "id")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "id_voucher",referencedColumnName = "id")
    private Voucher voucher;

}
