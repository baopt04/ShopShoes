package com.example.shopshoes.server.dto.logindto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ResponseToken {

    private String accessToken;

    private String refreshToken;
}
