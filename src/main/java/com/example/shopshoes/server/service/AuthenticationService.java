package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.logindto.ChangePassword;
import com.example.shopshoes.server.dto.logindto.ResetPassword;
import com.example.shopshoes.server.infrastructure.sercurity.auth.JwtAuhenticationResponse;
import com.example.shopshoes.server.infrastructure.sercurity.auth.RefreshTokenRequets;
import com.example.shopshoes.server.infrastructure.sercurity.auth.SignUpRequets;
import com.example.shopshoes.server.infrastructure.sercurity.auth.SigninRequest;

public interface AuthenticationService {

    String signUp(SignUpRequets signUpRequets);

    JwtAuhenticationResponse singIn(SigninRequest request);

    JwtAuhenticationResponse refreshToken(RefreshTokenRequets refresh);

    String resetPassword(ResetPassword resetPassword);

    String changePassword (ChangePassword changePassword);

}
