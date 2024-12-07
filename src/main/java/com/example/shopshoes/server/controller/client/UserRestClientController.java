package com.example.shopshoes.server.controller.client;

import com.example.shopshoes.server.infrastructure.session.ShoseSession;
import com.example.shopshoes.server.service.CustomerService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/client/user")
public class UserRestClientController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ShoseSession shoseSession;

    @GetMapping
    public ResponseObject getByEmail()  {
        return new ResponseObject(customerService.findByEmail(shoseSession.getCustomer().getEmail()));
    }
}
