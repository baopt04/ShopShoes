package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.StatusBill;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "product_detail_give_back")
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailGiveBack extends PrimaryEntity {

    @Column(name = "id_product_detail")
    private String idProductDetail;

    @Column(name = "quantity")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill;
}
