package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.StatusBill;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "bill_history")
@AllArgsConstructor
@NoArgsConstructor
public class BillHistory extends PrimaryEntity {

    @Column(name = "action_description")
    private String actionDescription;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill;

    @ManyToOne
    @JoinColumn(name = "id_bill",referencedColumnName = "id")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "id_employees",referencedColumnName = "id")
    private Account employees;

}
