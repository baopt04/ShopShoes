package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.StatusPromotion;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "promotion")
@AllArgsConstructor
@NoArgsConstructor
public class Promotion extends PrimaryEntity {

    private String code;

    private String name;

    private BigDecimal value;

    @Column(name = "start_date")
    private Long startDate;

    @Column(name = "end_date")
    private Long endDate;

    @Enumerated(EnumType.STRING)
    private StatusPromotion status;
}