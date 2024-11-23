package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.StatusMethod;
import com.example.shopshoes.server.infrastructure.constant.StatusPayMents;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "payments_method")
@AllArgsConstructor
@NoArgsConstructor
public class PaymentsMethod extends PrimaryEntity {

    @Enumerated(EnumType.STRING)
    private StatusMethod method;

    private String description;

    private String vnp_TransactionNo;

    @Column(name = "transaction_date")
    private Long transactionDate;

    @Column(name = "create_at")
    private Long createAt;

    @Column(name = "total_money")
    private BigDecimal totalMoney;

    @Enumerated(EnumType.STRING)
    private StatusPayMents status;

    @ManyToOne
    @JoinColumn(name = "id_employees",referencedColumnName = "id")
    private Account employees;

    @ManyToOne
    @JoinColumn(name = "id_bill",referencedColumnName = "id")
    private Bill bill;
}
