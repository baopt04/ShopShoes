package com.example.shopshoes.server.dto.logindto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResetPassword {

    private  String emailForgot ;

    private String phoneNumber;
}
