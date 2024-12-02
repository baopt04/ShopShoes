package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.service.AccountService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/account")
@CrossOrigin("*")
public class AccountRestController {

    @Autowired
    private AccountService accountService;

    @GetMapping()
    public ResponseObject getList() {
        return new ResponseObject(accountService.findAll());
    }

    @GetMapping("/get-email")
    public ResponseObject getOneByEmail(@RequestParam("email") String email) {
        return new ResponseObject(accountService.getOneByEmail(email));
    }
    @GetMapping("/simple-employess")
    public ResponseObject getAllSimpleEntityEmployess() {
        return new ResponseObject(accountService.getAllSimpleEntityEmployess());
    }

    @GetMapping("/detail-account/{idBill}")
    public ResponseObject getAccountUserByIdBill(@PathVariable("idBill") String idBill) {
        return new ResponseObject(accountService.getAccountUserByIdBill(idBill));
    }

}
