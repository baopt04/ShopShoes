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
@Table(name = "account_voucher")
@AllArgsConstructor
@NoArgsConstructor
public class AccountVoucher extends PrimaryEntity {

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_voucher",referencedColumnName = "id")
    private Voucher voucher;

    @ManyToOne
    @JoinColumn(name = "id_account",referencedColumnName = "id")
    private Account account;

}
