package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.service.HistoryPoinService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/admin/history-poin")
public class HistoryPoinRestController {

    @Autowired
    private HistoryPoinService historyPoinService;

    @GetMapping("/user/{idUser}")
    public ResponseObject view(@PathVariable("idUser") String idUser) {
        return new ResponseObject(historyPoinService.getAllHisToryPoinByIdUser(idUser));
    }
}
