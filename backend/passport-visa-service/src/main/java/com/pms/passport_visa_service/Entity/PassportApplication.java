package com.pms.passport_visa_service.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "passport_applications")
public class PassportApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "passport_application_id")
    private Integer passportApplicationId;

    @NotNull(message = "User ID is required")
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "passport_id", unique = true)
    private String passportId;

    @NotNull(message = "Service type ID is required")
    @Column(name = "service_type_id", nullable = false)
    private Integer serviceTypeId;

    @NotNull(message = "Booklet type ID is required")
    @Column(name = "booklet_type_id", nullable = false)
    private Integer bookletTypeId;

    @NotNull(message = "Passport type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "passport_type", nullable = false)
    private PassportType passportType;

    @Column(name = "application_date", nullable = false)
    private LocalDate applicationDate;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(name = "amount_paid", nullable = false)
    private BigDecimal amountPaid;

    @Column(name = "previous_passport_id")
    private String previousPassportId;

    @Column(name = "processing_days")
    private Integer processingDays;

    @Column(name = "user_first_name")
    private String userFirstName;

    @Column(name = "user_last_name")
    private String userLastName;

    @Column(name = "user_phone")
    private String userPhone;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_citizen_type")
    private String userCitizenType;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public PassportApplication() {}

    public PassportApplication(String userId, Integer serviceTypeId, Integer bookletTypeId,
                               PassportType passportType, LocalDate applicationDate, BigDecimal amountPaid) {
        this.userId = userId;
        this.serviceTypeId = serviceTypeId;
        this.bookletTypeId = bookletTypeId;
        this.passportType = passportType;
        this.applicationDate = applicationDate;
        this.amountPaid = amountPaid;
    }

    // Getters and Setters
    public Integer getPassportApplicationId() {
        return passportApplicationId;
    }

    public void setPassportApplicationId(Integer passportApplicationId) {
        this.passportApplicationId = passportApplicationId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassportId() {
        return passportId;
    }

    public void setPassportId(String passportId) {
        this.passportId = passportId;
    }

    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }

    public Integer getBookletTypeId() {
        return bookletTypeId;
    }

    public void setBookletTypeId(Integer bookletTypeId) {
        this.bookletTypeId = bookletTypeId;
    }

    public PassportType getPassportType() {
        return passportType;
    }

    public void setPassportType(PassportType passportType) {
        this.passportType = passportType;
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

    public String getPreviousPassportId() {
        return previousPassportId;
    }

    public void setPreviousPassportId(String previousPassportId) {
        this.previousPassportId = previousPassportId;
    }

    public Integer getProcessingDays() {
        return processingDays;
    }

    public void setProcessingDays(Integer processingDays) {
        this.processingDays = processingDays;
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

    public String getUserCitizenType() {
        return userCitizenType;
    }

    public void setUserCitizenType(String userCitizenType) {
        this.userCitizenType = userCitizenType;
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

    // Enums
    public enum PassportType {
        NEW, RENEWAL
    }

    public enum ApplicationStatus {
        PENDING, ISSUED, CANCELLED
    }

    @Override
    public String toString() {
        return "PassportApplication{" +
                "passportApplicationId=" + passportApplicationId +
                ", userId='" + userId + '\'' +
                ", passportId='" + passportId + '\'' +
                ", serviceTypeId=" + serviceTypeId +
                ", bookletTypeId=" + bookletTypeId +
                ", passportType=" + passportType +
                ", applicationDate=" + applicationDate +
                ", status=" + status +
                ", amountPaid=" + amountPaid +
                '}';
    }
}