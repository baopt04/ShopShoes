package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.dto.request.brand.CreateBrandRequest;
import com.example.shopshoes.server.dto.request.brand.FindBrandRequest;
import com.example.shopshoes.server.dto.request.brand.UpdateBrandRequest;
import com.example.shopshoes.server.service.BrandService;
import com.example.shopshoes.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/admin/brand")
public class BrandRestController {

    @Autowired
    private BrandService brandService;


    @GetMapping()
    public ResponseObject view(@ModelAttribute final FindBrandRequest req) {
        return new ResponseObject(brandService.findAll(req));
    }

    @GetMapping("/{id}")
    public ResponseObject getOneById(@PathVariable("id") String id) {
        return new ResponseObject(brandService.getOneById(id));
    }

    @PostMapping
    public ResponseObject add(@RequestBody CreateBrandRequest req) {
        return new ResponseObject(brandService.create(req));
    }

    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id,
                                 @RequestBody UpdateBrandRequest req) {
        req.setId(id);
        return new ResponseObject(brandService.update(req));
    }

    @DeleteMapping("/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(brandService.delete(id));
    }
}
