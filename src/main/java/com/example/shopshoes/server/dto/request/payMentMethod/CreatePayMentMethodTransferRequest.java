package com.example.shopshoes.server.dto.request.payMentMethod;

import com.example.shopshoes.server.dto.request.bill.billcustomer.BillDetailOnline;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class CreatePayMentMethodTransferRequest {

    public String vnp_Ammount ;
    public String vnp_OrderInfo = "Thanh toan hoa don";
    public String vnp_OrderType = "Thanh toan hoa don";
    public String vnp_TxnRef;
    private List<BillDetailOnline> billDetail;

}
