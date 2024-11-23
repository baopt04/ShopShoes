package com.example.shopshoes.server.entity;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import com.example.shopshoes.server.infrastructure.constant.Status;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "notification")
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends PrimaryEntity {

    @Column(name = "notify_content")
    private String notifyContent;

    private String url;

    private String receiver;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_account", referencedColumnName = "id")
    private Account account;

    @OneToOne
    @JoinColumn(name = "id_bill", referencedColumnName = "id")
    private Bill bill;
}
