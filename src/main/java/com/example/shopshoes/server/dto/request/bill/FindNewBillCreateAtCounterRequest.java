package com.example.shopshoes.server.dto.request.bill;

import com.example.shopshoes.server.util.ConvertDateToLong;
import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;
@Getter
@Setter
public class FindNewBillCreateAtCounterRequest {

    private Long startCreateBill = new ConvertDateToLong().getLongDateNow();

    private Long endCreateBill =  new ConvertDateToLong().getLongDateNow();

    private String key;

}
