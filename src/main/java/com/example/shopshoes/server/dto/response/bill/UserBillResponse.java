package com.example.shopshoes.server.dto.response.bill;

import com.example.shopshoes.server.entity.Bill;
import com.example.shopshoes.server.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author thangdt
 */
@Projection(types = {Bill.class, User.class})
public interface UserBillResponse {

    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.id}")
    String getId();

    @Value("#{target.userName}")
    String getUserName();
}
