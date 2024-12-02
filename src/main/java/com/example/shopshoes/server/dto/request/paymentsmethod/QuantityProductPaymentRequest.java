package com.example.shopshoes.server.dto.request.paymentsmethod;

import com.example.shopshoes.server.dto.request.bill.billcustomer.BillDetailOnline;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class QuantityProductPaymentRequest {
    List<BillDetailOnline> billDetail;
}
