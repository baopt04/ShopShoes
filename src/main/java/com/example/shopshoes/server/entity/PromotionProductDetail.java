package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.Status;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "promotion_product_detail")
@AllArgsConstructor
@NoArgsConstructor
public class PromotionProductDetail  extends PrimaryEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_promotion",referencedColumnName = "id")
    private Promotion promotion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product_detail",referencedColumnName = "id")
    private ProductDetail productDetail;

    @Enumerated(EnumType.STRING)
    private Status status;
}
