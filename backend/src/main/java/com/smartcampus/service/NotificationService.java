package com.smartcampus.service;

import com.smartcampus.model.Notification;
import com.smartcampus.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public Notification createNotification(String userId, String message, String type, String relatedId) {
        try {
            Notification notification = Notification.builder()
                    .userId(userId)
                    .message(message)
                    .type(type)
                    .relatedId(relatedId)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();
            return notificationRepository.save(notification);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Notification createSystemNotification(String message, String type, String relatedId) {
        return createNotification("GLOBAL_ADMIN", message, type, relatedId);
    }

    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getSystemNotifications() {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc("GLOBAL_ADMIN");
    }

    public void markAsRead(String notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }

    public void markAllAsRead(String userId) {
        try {
            List<Notification> unread = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                    .stream().filter(n -> !n.isRead()).toList();
            unread.forEach(n -> n.setRead(true));
            notificationRepository.saveAll(unread);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public long getUnreadCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }
}
