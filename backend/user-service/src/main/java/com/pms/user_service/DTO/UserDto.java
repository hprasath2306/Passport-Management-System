package com.pms.user_service.DTO;

import com.pms.user_service.Entity.User;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class UserDto {

    @NotBlank(message = "First name is required")
    public String firstName;

    @NotBlank(message = "Last name is required")
    public String lastName;

    @NotNull(message = "Date of birth is required")
    public LocalDate dateOfBirth;

    @NotBlank(message = "Phone number is required")
    public String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    public String email;

    @NotBlank(message = "Password is required")
    public String password;

    @NotBlank(message = "Address is required")
    public String address;

    @NotBlank(message = "City is required")
    public String city;

    @NotBlank(message = "State is required")
    public String state;

    @NotBlank(message = "Pincode is required")
    public String pincode;

    @NotNull(message = "Occupation is required")
    public User.Occupation occupation;

    @NotNull(message = "Registration type is required")
    public User.RegistrationType registrationType;

    public UserDto() {}

    public UserDto(String firstName, String lastName, LocalDate dateOfBirth, String phoneNumber, String email, String password, String address, String city, String state, String pincode, User.Occupation occupation, User.RegistrationType registrationType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.occupation = occupation;
        this.registrationType = registrationType;
    }

    public @NotBlank(message = "First name is required") String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotBlank(message = "First name is required") String firstName) {
        this.firstName = firstName;
    }

    public @NotBlank(message = "Last name is required") String getLastName() {
        return lastName;
    }

    public void setLastName(@NotBlank(message = "Last name is required") String lastName) {
        this.lastName = lastName;
    }

    public @NotNull(message = "Date of birth is required") LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(@NotNull(message = "Date of birth is required") LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public @NotBlank(message = "Phone number is required") String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(@NotBlank(message = "Phone number is required") String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public @NotBlank(message = "Email is required") @Email(message = "Email should be valid") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Email(message = "Email should be valid") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password is required") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") String password) {
        this.password = password;
    }

    public @NotBlank(message = "Address is required") String getAddress() {
        return address;
    }

    public void setAddress(@NotBlank(message = "Address is required") String address) {
        this.address = address;
    }

    public @NotBlank(message = "City is required") String getCity() {
        return city;
    }

    public void setCity(@NotBlank(message = "City is required") String city) {
        this.city = city;
    }

    public @NotBlank(message = "State is required") String getState() {
        return state;
    }

    public void setState(@NotBlank(message = "State is required") String state) {
        this.state = state;
    }

    public @NotBlank(message = "Pincode is required") String getPincode() {
        return pincode;
    }

    public void setPincode(@NotBlank(message = "Pincode is required") String pincode) {
        this.pincode = pincode;
    }

    public @NotNull(message = "Occupation is required") User.Occupation getOccupation() {
        return occupation;
    }

    public void setOccupation(@NotNull(message = "Occupation is required") User.Occupation occupation) {
        this.occupation = occupation;
    }

    public @NotNull(message = "Registration type is required") User.RegistrationType getRegistrationType() {
        return registrationType;
    }

    public void setRegistrationType(@NotNull(message = "Registration type is required") User.RegistrationType registrationType) {
        this.registrationType = registrationType;
    }
}
