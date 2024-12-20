package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.dto.request.address.UpdateAddressClientRequest;
import com.example.shopshoes.server.dto.request.customer.ChangePasswordRequest;
import com.example.shopshoes.server.dto.request.customer.UpdateInfoClient;
import com.example.shopshoes.server.infrastructure.exception.rest.CustomListValidationException;
import com.example.shopshoes.server.infrastructure.session.ShoseSession;
import com.example.shopshoes.server.service.AccountService;
import com.example.shopshoes.server.service.CustomerService;
import com.example.shopshoes.server.util.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequestMapping("/client/account")
public class AccountClientRestController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private CustomerService customerService;

    @Autowired
    private ShoseSession shoseSession;

    @PostMapping("/changePassword")
    public ResponseObject update(@Valid @RequestBody  ChangePasswordRequest request, BindingResult bindingResult) throws CustomListValidationException {
        if(bindingResult.hasErrors()){
            throw new CustomListValidationException(404,bindingResult.getAllErrors());
        }
        return new ResponseObject(accountService.changePassword(request));
    }
    @GetMapping("/{id}")
    public ResponseObject getById(@PathVariable("id")String id)  {
        System.out.println(shoseSession.getCustomer());
        return new ResponseObject(accountService.getAccountById(id));
    }
    @PostMapping(value = "/updateInfo",consumes = "multipart/form-data")
    public ResponseObject updateInfo( UpdateInfoClient req)  {
        return new ResponseObject(customerService.updateInfoClient(req));
    }
}
