package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.dto.request.billdetail.BillDetailRequest;
import com.example.shopshoes.server.dto.request.billdetail.CreateBillDetailRequest;
import com.example.shopshoes.server.dto.request.billdetail.RefundProductRequest;
import com.example.shopshoes.server.infrastructure.session.ShoseSession;
import com.example.shopshoes.server.service.BillDetailService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin("*")
@RequestMapping("/admin/bill-detail")
public class BillDetailRestController {

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private ShoseSession shoseSession;

    @GetMapping("")
    public ResponseObject findAByIdBill(BillDetailRequest request){
        return  new ResponseObject(billDetailService.create());
    }



    @PutMapping("/Find")
    public ResponseObject refundProduct(@RequestBody RefundProductRequest request){
        return  new ResponseObject(billDetailService.refundProduct(request));
    }

    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id")String id, @RequestBody CreateBillDetailRequest request){
        return  new ResponseObject(billDetailService.update(id,shoseSession.getEmployee().getId(), request));
    }

    @PostMapping("/add-new-product")
    public ResponseObject addNewProduct(@RequestBody CreateBillDetailRequest request){
        return  new ResponseObject(billDetailService.create(shoseSession.getEmployee().getId(), request));
    }

    @DeleteMapping("/remove/{id}/{productDetail}")
    public ResponseObject removeProductInBill(@PathVariable("id") String id, @PathVariable("productDetail") String productDetail, @RequestParam("note") String note){
        return  new ResponseObject(billDetailService.delete(id, productDetail,note, shoseSession.getEmployee().getId()));
    }
}
