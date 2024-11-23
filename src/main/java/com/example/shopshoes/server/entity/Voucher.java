package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "voucher")
@AllArgsConstructor
@NoArgsConstructor
public class Voucher extends PrimaryEntity {

    private String code;

    private String name;

    private BigDecimal value;

    private Integer quantity;

    private String urlImage;

    @Column(name = "start_date")
    private Long startDate;

    @Column(name = "end_date")
    private Long endDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer minimumBill;
}
