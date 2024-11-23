package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.StatusBill;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "bill_detail")
@AllArgsConstructor
@NoArgsConstructor
public class BillDetail extends PrimaryEntity {

    private Integer quantity;

    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill ;

    private BigDecimal promotion;

    @ManyToOne
    @JoinColumn(name = "id_product_detail")
    private ProductDetail productDetail;

    @ManyToOne
    @JoinColumn(name = "id_bill")
    private Bill bill;
}
