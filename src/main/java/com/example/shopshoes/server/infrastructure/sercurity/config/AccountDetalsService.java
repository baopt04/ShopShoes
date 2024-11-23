package com.example.shopshoes.server.infrastructure.sercurity.config;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountDetalsService {

    UserDetailsService userDetailsService();
}
