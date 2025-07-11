package com.pms.user_service.DTO;

import com.pms.user_service.Entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserResponseDto {
    public String userId;
    public String customerId;
    public String firstName;
    public String lastName;
    public String email;
    public String phoneNumber;
    public LocalDate dateOfBirth;
    public int age;
    public String address;
    public String pincode;
    public String city;
    public String state;
    public boolean isEmailVerified;
    public User.CitizenType citizenType;
    public User.Occupation occupation;
    public User.RegistrationType registrationType;
    public LocalDateTime createdAt;

    public UserResponseDto(User user) {
        this.userId = user.getUserId();
        this.customerId = user.getCustomerId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.dateOfBirth = user.getDateOfBirth();
        this.age = user.getAge();
        this.address = user.getAddress();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        this.city = user.getCity();
        this.state = user.getState();
        this.pincode = user.getPincode();
        this.isEmailVerified = user.getIsEmailVerified();
        this.citizenType = user.getCitizenType();
        this.occupation = user.getOccupation();
        this.registrationType = user.getRegistrationType();
        this.createdAt = user.getCreatedAt();
    }
}
