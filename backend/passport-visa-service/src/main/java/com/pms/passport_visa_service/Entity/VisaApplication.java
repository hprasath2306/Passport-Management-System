package com.pms.passport_visa_service.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "visa_applications")
public class VisaApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visa_application_id")
    private Integer visaApplicationId;

    @NotNull(message = "User ID is required")
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "visa_id", unique = true)
    private String visaId;

    @NotNull(message = "Passport ID is required")
    @Column(name = "passport_id", nullable = false)
    private String passportId;

    @NotNull(message = "Destination country is required")
    @Column(name = "destination_country", nullable = false)
    private String destinationCountry;

    @NotNull(message = "Visa type is required")
    @Column(name = "visa_type", nullable = false)
    private String visaType;

    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "validity_years", nullable = false)
    private BigDecimal validityYears;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @NotNull(message = "Amount paid is required")
    @Column(name = "amount_paid", nullable = false)
    private BigDecimal amountPaid;

    // Cached user information for performance
    @Column(name = "user_first_name")
    private String userFirstName;

    @Column(name = "user_last_name")
    private String userLastName;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_occupation")
    private String userOccupation;

    @Column(name = "cancellation_comment", columnDefinition = "TEXT")
    private String cancellationComment;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public VisaApplication() {}

    public VisaApplication(String userId, String passportId, String destinationCountry, String visaType,
                           LocalDate applicationDate, BigDecimal validityYears, BigDecimal amountPaid) {
        this.userId = userId;
        this.passportId = passportId;
        this.destinationCountry = destinationCountry;
        this.visaType = visaType;
        this.applicationDate = applicationDate;
        this.validityYears = validityYears;
        this.amountPaid = amountPaid;
    }

    // Getters and Setters
    public Integer getVisaApplicationId() {
        return visaApplicationId;
    }

    public void setVisaApplicationId(Integer visaApplicationId) {
        this.visaApplicationId = visaApplicationId;
    }

    public String getCancellationComment() {
        return cancellationComment;
    }

    public void setCancellationComment(String cancellationComment) {
        this.cancellationComment = cancellationComment;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getVisaId() {
        return visaId;
    }

    public void setVisaId(String visaId) {
        this.visaId = visaId;
    }

    public String getPassportId() {
        return passportId;
    }

    public void setPassportId(String passportId) {
        this.passportId = passportId;
    }

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public void setDestinationCountry(String destinationCountry) {
        this.destinationCountry = destinationCountry;
    }

    public String getVisaType() {
        return visaType;
    }

    public void setVisaType(String visaType) {
        this.visaType = visaType;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public BigDecimal getValidityYears() {
        return validityYears;
    }

    public void setValidityYears(BigDecimal validityYears) {
        this.validityYears = validityYears;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserOccupation() {
        return userOccupation;
    }

    public void setUserOccupation(String userOccupation) {
        this.userOccupation = userOccupation;
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

    public enum ApplicationStatus {
        PENDING, ISSUED, CANCELLED
    }
}
