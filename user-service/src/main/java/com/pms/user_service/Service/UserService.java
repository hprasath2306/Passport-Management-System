package com.pms.user_service.Service;

import com.pms.user_service.DTO.UserDto;
import com.pms.user_service.Entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    User createUser(UserDto request);
    String verifyEmail(String token);
    String resendVerificationEmail(String email);
}