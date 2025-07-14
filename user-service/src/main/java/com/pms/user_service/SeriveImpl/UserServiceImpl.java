package com.pms.user_service.SeriveImpl;

import com.pms.user_service.DTO.LoginRequestDto;
import com.pms.user_service.DTO.LoginResponseDto;
import com.pms.user_service.DTO.UserDto;
import com.pms.user_service.DTO.UserResponseDto;
import com.pms.user_service.Entity.User;
import com.pms.user_service.Repository.UserRepository;
import com.pms.user_service.Service.UserService;
import com.pms.user_service.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

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
        int age = calculateAge(request.dateOfBirth);
        User.CitizenType citizenType = determineCitizenType(age);
        String userId = generateUserId(request.registrationType);
        String customerId = generateCustomerId();

        User user = mapToUserEntity(request, userId, customerId, age, citizenType);
        return userRepository.save(user);
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequest) {
        User user = userRepository.findByCustomerIdOrPhoneNumber(
                loginRequest.getCustomerIdOrPhone(),
                loginRequest.getCustomerIdOrPhone()
        ).orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getCustomerId(), user.getUserId());
        UserResponseDto userResponse = new UserResponseDto(user);
        return new LoginResponseDto(token, userResponse);
    }

    //Helper methods
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
        return user;
    }

}
