package com.example.shopshoes.server.infrastructure.listener;

import com.example.shopshoes.server.entity.base.PrimaryEntity;
import jakarta.persistence.PrePersist;

import java.util.UUID;


public class CreatePrimaryEntityListener {

    @PrePersist
    private void onCreate(PrimaryEntity entity) {
        entity.setId(UUID.randomUUID().toString());
    }
}