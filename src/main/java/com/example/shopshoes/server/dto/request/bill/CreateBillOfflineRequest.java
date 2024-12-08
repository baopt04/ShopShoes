package com.example.shopshoes.server.dto.request.bill;

import com.example.shopshoes.server.dto.request.billdetail.CreateBillDetailRequest;
import com.example.shopshoes.server.dto.request.paymentsmethod.CreatePaymentsMethodRequest;
import com.example.shopshoes.server.dto.request.voucherdetail.CreateVoucherDetailRequest;
import com.example.shopshoes.server.infrastructure.constant.StatusBill;
import com.example.shopshoes.server.infrastructure.constant.StatusMethod;
import com.example.shopshoes.server.infrastructure.constant.StatusPayMents;
import com.example.shopshoes.server.infrastructure.constant.TypeBill;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CreateBillOfflineRequest {

    private String phoneNumber;

    private String idUser;

    private String address;

    private String userName;

    @NotEmpty
    private String itemDiscount;

    @NotEmpty
    private String totalMoney;

    private String note;

    @NotEmpty
    private String typeBill;

    @NotEmpty
    private String code;

    private int poin;

    @NotEmpty
    private String statusPayMents;

    private String deliveryDate;

    private boolean openDelivery;

    private String moneyShip;

    private String email;

    private BigDecimal totalExcessMoney;

    @NotNull
    private List<CreateBillDetailRequest> billDetailRequests;

    @NotNull
    private List<CreatePaymentsMethodRequest> paymentsMethodRequests;

    @NotNull
    private List<CreateVoucherDetailRequest> vouchers;

}
