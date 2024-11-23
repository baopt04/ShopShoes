package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.StatusBill;
import com.example.shopshoes.server.infrastructure.constant.TypeBill;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "bill")
@AllArgsConstructor
@NoArgsConstructor
public class Bill extends PrimaryEntity {

    @Column(name = "code")
    private String code;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "item_discount")
    private BigDecimal itemDiscount;

    @Column(name = "total_money")
    private BigDecimal totalMoney;

    private String email;

    @Column(name = "confirmation_date")
    private Long confirmationDate;

    @Column(name = "delivery_date")
    private Long deliveryDate;

    @Column(name = "shipping_time")
    private Long shippingTime;

    @Column(name = "receive_date ")
    private Long receiveDate ;

    @Column(name = "completion_date ")
    private Long completionDate;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeBill typeBill;

    @Column(name = "note")
    private String note;

    @Column(name = "money_ship ")
    private BigDecimal moneyShip;

    private int poinUse;

    @Column(name = "value_poin")
    private BigDecimal valuePoin;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill;

    @ManyToOne
    @JoinColumn(name = "id_customer",referencedColumnName = "id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "id_employees",referencedColumnName = "id")
    private Account employees;

    @ManyToOne
    @JoinColumn(name = "id_account",referencedColumnName = "id")
    private Account account;
}
