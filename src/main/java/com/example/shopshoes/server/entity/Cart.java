package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "cart")
@AllArgsConstructor
@NoArgsConstructor
public class Cart extends PrimaryEntity {

    @OneToOne
    @JoinColumn(name = "id_account",referencedColumnName = "id")
    private Account account;

}
