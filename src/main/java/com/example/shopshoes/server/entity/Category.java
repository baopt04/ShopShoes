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
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
public class Category extends PrimaryEntity {

    private String name ;

    @Enumerated(EnumType.STRING)
    private Status status;


}
