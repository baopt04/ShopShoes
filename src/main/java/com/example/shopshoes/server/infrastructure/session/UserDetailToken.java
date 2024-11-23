package com.example.shopshoes.server.infrastructure.session;

import lombok.*;

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
