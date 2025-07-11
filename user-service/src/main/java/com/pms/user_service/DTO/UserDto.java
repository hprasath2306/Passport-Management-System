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
}
