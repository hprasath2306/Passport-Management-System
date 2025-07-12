package com.pms.user_service.SeriveImpl;

import com.pms.user_service.DTO.UserDto;
import com.pms.user_service.Entity.User;
import com.pms.user_service.Repository.UserRepository;
import com.pms.user_service.Service.EmailService;
import com.pms.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public User createUser(UserDto request) {
        if (userRepository.existsByEmail(request.email)) {
            throw new RuntimeException("User with this email already exists");
        }
        if (userRepository.existsByPhoneNumber(request.phoneNumber)) {
            throw new RuntimeException("User with this phone number already exists");
        }

        int age = calculateAge(request.dateOfBirth);
        User.CitizenType citizenType = determineCitizenType(age);
        String userId = generateUserId(request.registrationType);
        String customerId = generateCustomerId();
        User user = mapToUserEntity(request, userId, customerId, age, citizenType);
        String verificationToken = generateVerificationToken();
        user.setEmailVerificationToken(verificationToken);
        user.setEmailVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        User savedUser = userRepository.save(user);
        try {
            emailService.sendVerificationEmail(user.getEmail(), verificationToken);
        } catch (Exception e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
        }
        return savedUser;
    }

    @Override
    public String verifyEmail(String token) {
        User user = userRepository.findByValidVerificationToken(token, LocalDateTime.now())
                .orElseThrow(() -> new RuntimeException("Invalid or expired verification token"));

        user.setIsEmailVerified(true);
        user.setEmailVerificationToken(null);
        user.setEmailVerificationTokenExpiry(null);
        userRepository.save(user);
        return "Email verified successfully!";
    }

    @Override
    public String resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        if (user.getIsEmailVerified()) {
            throw new RuntimeException("Email is already verified");
        }

        String verificationToken = generateVerificationToken();
        user.setEmailVerificationToken(verificationToken);
        user.setEmailVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        return "Verification email sent successfully!";
    }

    // Helper methods
    private int calculateAge(LocalDate dateOfBirth) {
        return Period.between(dateOfBirth, LocalDate.now()).getYears();
    }

    private User.CitizenType determineCitizenType(int age) {
        if (age <= 1) return User.CitizenType.INFANT;
        else if (age <= 10) return User.CitizenType.CHILDREN;
        else if (age <= 20) return User.CitizenType.TEEN;
        else if (age <= 50) return User.CitizenType.ADULT;
        else return User.CitizenType.SENIOR_CITIZEN;
    }

    private String generateUserId(User.RegistrationType registrationType) {
        String prefix = registrationType == User.RegistrationType.PASSPORT ? "PASS" : "VISA";
        return prefix + "-" + String.format("%04d", new Random().nextInt(10000));
    }

    private String generateCustomerId() {
        int randomNumber = 100000 + new Random().nextInt(900000);
        return String.valueOf(randomNumber);
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    private User mapToUserEntity(UserDto request, String userId, String customerId, int age, User.CitizenType citizenType) {
        User user = new User();
        user.setUserId(userId);
        user.setCustomerId(customerId);
        user.setFirstName(request.firstName);
        user.setLastName(request.lastName);
        user.setDateOfBirth(request.dateOfBirth);
        user.setAge(age);
        user.setCitizenType(citizenType);
        user.setPhoneNumber(request.phoneNumber);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setAddress(request.address);
        user.setCity(request.city);
        user.setState(request.state);
        user.setPincode(request.pincode);
        user.setOccupation(request.occupation);
        user.setRegistrationType(request.registrationType);
        user.setIsEmailVerified(false);
        return user;
    }
}