package com.pms.user_service.Service;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
}