package com.example.shopshoes.server.dto.response.voucher;

import com.example.shopshoes.server.entity.Voucher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = Voucher.class)
public interface VoucherDetailCustomAtCountry {

    @Value("#{target.id_voucher}")
    String getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.befor_price}")
    String getBeforPrice();

    @Value("#{target.after_price}")
    String getAfterPrice();

    @Value("#{target.discount_price}")
    String getDiscountPrice();

}
