package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.Roles;
import com.example.shopshoes.server.infrastructure.constant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
public class User extends PrimaryEntity {

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "date_of_birth")
    private Long dateOfBirth;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "avata")
    private String avata;

    @Column(name = "points")
    private Integer points;

    @Column(name = "citizen_identity ")
    private String citizenIdentity;

    @Enumerated(EnumType.STRING)
    private Status status;
}
