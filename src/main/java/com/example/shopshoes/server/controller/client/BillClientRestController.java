package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.dto.request.bill.CancelBillClientRequest;
import com.example.shopshoes.server.dto.request.bill.ChangStatusBillRequest;
import com.example.shopshoes.server.dto.request.bill.StatusRequest;
import com.example.shopshoes.server.dto.request.bill.billaccount.CreateBillAccountOnlineRequest;
import com.example.shopshoes.server.dto.request.bill.billcustomer.CreateBillCustomerOnlineRequest;
import com.example.shopshoes.server.dto.request.billdetail.BillDetailRequest;
import com.example.shopshoes.server.dto.response.billdetail.BillDetailResponse;
import com.example.shopshoes.server.entity.BillHistory;
import com.example.shopshoes.server.entity.ProductDetail;
import com.example.shopshoes.server.infrastructure.constant.Message;
import com.example.shopshoes.server.infrastructure.constant.Status;
import com.example.shopshoes.server.infrastructure.constant.StatusBill;
import com.example.shopshoes.server.infrastructure.session.ShoseSession;
import com.example.shopshoes.server.service.BillService;
import com.example.shopshoes.server.util.ResponseObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/bill")
public class BillClientRestController {
    @Autowired
    private BillService billService;

    @Autowired
    private ShoseSession shoseSession;

    @PostMapping("/status")
    public ResponseObject getAllBillAccount(@RequestBody StatusRequest request )  {
        return new ResponseObject(billService.getAllBillAccount(request));
    }

    @PostMapping("")
    public ResponseObject create(@RequestBody CreateBillCustomerOnlineRequest request)  {
        return new ResponseObject(billService.createBillCustomerOnlineRequest(request));
    }
    @PostMapping("/account")
    public ResponseObject create(@RequestBody CreateBillAccountOnlineRequest request)  {
        return new ResponseObject(billService.createBillAccountOnlineRequest(request));
    }

    @GetMapping("/{code}/{phoneNumber}")
    public ResponseObject create(@PathVariable("code") String code, @PathVariable("phoneNumber") String phoneNumber)  {
        return new ResponseObject(billService.findByCode(code, phoneNumber));
    }
    @GetMapping("/detail/{id}")
    public ResponseObject detail(@PathVariable("id") String id){
        return  new ResponseObject(billService.detail(id));
    }

    @PutMapping("/cancel-status/{id}")
    public ResponseObject cancelStatusBill(@PathVariable("id") String id, ChangStatusBillRequest request){
        return  new ResponseObject(billService.cancelBill(id, shoseSession.getEmployee().getId(), request));
    }
    @PutMapping("/cancel")
    public ResponseObject cancel(@RequestBody CancelBillClientRequest cancelBillClientRequest)  {
        return new ResponseObject(billService.changeStatusBill(cancelBillClientRequest));
    }
}



