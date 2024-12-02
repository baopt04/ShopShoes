package com.example.shopshoes.server.controller.admin;

import com.example.shopshoes.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shopshoes.server.dto.request.voucher.FindVoucherRequest;
import com.example.shopshoes.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shopshoes.server.infrastructure.exception.rest.CustomListValidationException;
import com.example.shopshoes.server.infrastructure.exception.rest.RestApiException;
import com.example.shopshoes.server.service.VoucherService;
import com.example.shopshoes.server.util.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/admin/voucher")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping()
    public ResponseObject getAll(@ModelAttribute final FindVoucherRequest findVoucherRequest) {
        return new ResponseObject(voucherService.getAll(findVoucherRequest));

    }

    @GetMapping("/{id}")
    public ResponseObject getById(@PathVariable("id") String id) {
        return new ResponseObject(voucherService.getById(id));
    }

    @PostMapping
    public ResponseObject add(@Valid @RequestBody CreateVoucherRequest request, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new CustomListValidationException(404, bindingResult.getAllErrors());
        }
        return new ResponseObject(voucherService.add(request));
    }

    @PostMapping("/expired/{id}")
    public ResponseObject voucherExpired(@PathVariable("id") String id) throws RestApiException {

        return new ResponseObject(voucherService.updateStatus(id));
    }

    @PostMapping("/expired-quantity/{id}")
    public ResponseObject voucherExpiredQuantity(@PathVariable("id") String id) throws RestApiException {

        return new ResponseObject(voucherService.updateStatusQuantity(id));
    }

    @PutMapping("/{id}")
    public ResponseObject update(@PathVariable("id") String id, @Valid @RequestBody UpdateVoucherRequest request, BindingResult bindingResult) throws CustomListValidationException {
        request.setId(id);
        if (bindingResult.hasErrors()) {
            throw new CustomListValidationException(404, bindingResult.getAllErrors());
        }
        return new ResponseObject(voucherService.update(request));
    }

    @DeleteMapping("/{id}")
    public ResponseObject delete(@PathVariable("id") String id) {
        return new ResponseObject(voucherService.delete(id));
    }

    @GetMapping("/minimum/{minimum}")
    public ResponseObject getVoucherByMinimum(@PathVariable("minimum") int minimum) {
        return new ResponseObject(voucherService.getVoucherByMinimum(minimum));
    }
}
