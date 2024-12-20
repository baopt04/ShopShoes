package com.example.shopshoes.server.infrastructure.session;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetailToken {
    private String fullName;
    private String email;
    private String id;
    private String role;
}
