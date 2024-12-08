package com.example.shopshoes.server.service;

import com.example.shopshoes.server.dto.request.notification.CreateNotificationRequest;
import com.example.shopshoes.server.entity.Notification;

import java.util.List;

public interface NotificationService {

     List<Notification> getListNotiOfAdmin();
     List<Notification> getListNotiOfAdminnotRead();

     Notification createNoti(CreateNotificationRequest request);
     Notification updateStatusNoti(String id);

}
