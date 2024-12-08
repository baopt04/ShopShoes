package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.dto.request.ScoringFormulaRequest;
import com.example.shopshoes.server.service.ScoringFormulaService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/scoring-formula")
public class ScoringFormulaRestController {

    @Autowired
    private ScoringFormulaService scoringFormulaService;

    @PostMapping
    public ResponseObject addOrUpdate (@RequestBody ScoringFormulaRequest request){
        return new ResponseObject(scoringFormulaService.add(request));
    }
}
