package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
public class Product extends PrimaryEntity {

    private String code;

    private String name;

    @Enumerated(EnumType.STRING)
    private Status status ;

}
