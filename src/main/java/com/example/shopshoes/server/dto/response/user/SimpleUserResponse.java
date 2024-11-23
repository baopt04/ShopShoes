package com.example.shopshoes.server.dto.response.user;

import com.example.shopshoes.server.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = {User.class})
public interface SimpleUserResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.full_name}")
    String getUserName();

}
