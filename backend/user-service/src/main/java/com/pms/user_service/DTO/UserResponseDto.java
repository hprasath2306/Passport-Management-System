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
        this.citizenType = user.getCitizenType();
        this.occupation = user.getOccupation();
        this.registrationType = user.getRegistrationType();
        this.createdAt = user.getCreatedAt();
    }

    public UserResponseDto() {
    }

    public UserResponseDto(String userId, String customerId, String firstName, String lastName, String email, String phoneNumber, LocalDate dateOfBirth, int age, String address, String pincode, String city, String state, User.CitizenType citizenType, User.Occupation occupation, User.RegistrationType registrationType, LocalDateTime createdAt) {
        this.userId = userId;
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.address = address;
        this.pincode = pincode;
        this.city = city;
        this.state = state;
        this.citizenType = citizenType;
        this.occupation = occupation;
        this.registrationType = registrationType;
        this.createdAt = createdAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public User.CitizenType getCitizenType() {
        return citizenType;
    }

    public void setCitizenType(User.CitizenType citizenType) {
        this.citizenType = citizenType;
    }

    public User.Occupation getOccupation() {
        return occupation;
    }

    public void setOccupation(User.Occupation occupation) {
        this.occupation = occupation;
    }

    public User.RegistrationType getRegistrationType() {
        return registrationType;
    }

    public void setRegistrationType(User.RegistrationType registrationType) {
        this.registrationType = registrationType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
