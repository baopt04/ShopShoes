package com.example.shopshoes.server.infrastructure.sercurity.auth;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RefreshTokenRequets {
    private String token;
}
