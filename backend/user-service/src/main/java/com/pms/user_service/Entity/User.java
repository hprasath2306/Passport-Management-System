package com.pms.user_service.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "customer_id", nullable = false, unique = true)
    private String customerId;

    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(name = "date_of_birth", nullable = false)
    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @Column(name = "age", nullable = false)
    @Min(value = 0, message = "Age must be positive")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "citizen_type", nullable = false)
    @NotNull(message = "Citizen type is required")
    private CitizenType citizenType;

    @Column(name = "phone_number", nullable = false, unique = true)
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @Column(name = "email", nullable = true)
    @Email(message = "Email should be valid")
    private String email;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password is required")
    private String password;

    @Column(name = "address", columnDefinition = "TEXT", nullable = false)
    @NotBlank(message = "Address is required")
    private String address;

    @Column(name = "city", nullable = false)
    @NotBlank(message = "City is required")
    private String city;

    @Column(name = "state", nullable = false)
    @NotBlank(message = "State is required")
    private String state;

    @Column(name = "pincode", nullable = false)
    @NotBlank(message = "Pincode is required")
    private String pincode;

    @Enumerated(EnumType.STRING)
    @Column(name = "occupation", nullable = false)
    @NotNull(message = "Occupation is required")
    private Occupation occupation;

    @Enumerated(EnumType.STRING)
    @Column(name = "registration_type", nullable = false)
    @NotNull(message = "Registration type is required")
    private RegistrationType registrationType;

    @CreationTimestamp
    @Column(name = "created_at", nullable = true, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updatedAt;

    // Enums
    public enum CitizenType {
        INFANT, CHILDREN, TEEN, ADULT, SENIOR_CITIZEN
    }

    public enum Occupation {
        STUDENT, PRIVATE_EMPLOYEE, GOVERNMENT_EMPLOYEE, SELF_EMPLOYED, RETIRED_EMPLOYEE
    }

    public enum RegistrationType {
        PASSPORT, VISA
    }

    // Constructors
    public User() {}

    public User(String userId, String customerId, String firstName, String lastName,
                LocalDate dateOfBirth, Integer age, CitizenType citizenType,
                String phoneNumber, String email, String password, String address,
                String city, String state, String pincode, Occupation occupation,
                RegistrationType registrationType) {
        this.userId = userId;
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.citizenType = citizenType;
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

    // Getters and Setters
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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public CitizenType getCitizenType() {
        return citizenType;
    }

    public void setCitizenType(CitizenType citizenType) {
        this.citizenType = citizenType;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Occupation getOccupation() {
        return occupation;
    }

    public void setOccupation(Occupation occupation) {
        this.occupation = occupation;
    }

    public RegistrationType getRegistrationType() {
        return registrationType;
    }

    public void setRegistrationType(RegistrationType registrationType) {
        this.registrationType = registrationType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // toString
    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", customerId='" + customerId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", citizenType=" + citizenType +
                ", occupation=" + occupation +
                ", registrationType=" + registrationType +
                ", createdAt=" + createdAt +
                '}';
    }
}