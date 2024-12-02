package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.service.BillHistoryService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/bill-history")
public class BillClientHistoryRestController {

    @Autowired
    private BillHistoryService billHistoryService;

    @GetMapping("/{id}")
    public ResponseObject findAllByIdBill(@PathVariable("id") String id){
        return new ResponseObject(billHistoryService.findAllByIdBill(id));
    }
    @GetMapping("/byBill/{idBill}")
    public ResponseObject getByIdBill(@PathVariable("idBill") String idBill){
        return new ResponseObject(billHistoryService.getBillHistoryByIdBill(idBill));
    }


}
