package com.example.shopshoes.server.repository;

import com.example.shopshoes.server.entity.Notification;
import com.example.shopshoes.server.infrastructure.constant.Status;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface NotificationRepository extends JpaRepository<Notification,String> {
    List<Notification> findAllByReceiver(@Param("receiver") String receiver, Sort sort);

    List<Notification> findAllByReceiverAndStatus(@Param("receiver") String receiver ,@Param("status") Status status);
}
