package com.pms.passport_visa_service.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_types")
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_type_id")
    private Integer serviceTypeId;

    @NotBlank(message = "Service name cannot be blank")
    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @NotNull(message = "Service category is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "service_category", nullable = false)
    private ServiceCategory serviceCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "passport_type")
    private PassportType passportType;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @NotNull(message = "Processing days is required")
    @Column(name = "processing_days", nullable = false)
    private Integer processingDays;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public ServiceType() {}

    public ServiceType(String serviceName, ServiceCategory serviceCategory, PassportType passportType,
                       BigDecimal amount, Integer processingDays) {
        this.serviceName = serviceName;
        this.serviceCategory = serviceCategory;
        this.passportType = passportType;
        this.amount = amount;
        this.processingDays = processingDays;
    }

    // Getters and Setters
    public Integer getServiceTypeId() {
        return serviceTypeId;
    }

    public void setServiceTypeId(Integer serviceTypeId) {
        this.serviceTypeId = serviceTypeId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public ServiceCategory getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(ServiceCategory serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public PassportType getPassportType() {
        return passportType;
    }

    public void setPassportType(PassportType passportType) {
        this.passportType = passportType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getProcessingDays() {
        return processingDays;
    }

    public void setProcessingDays(Integer processingDays) {
        this.processingDays = processingDays;
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

    public void setId(Integer id) {
        this.serviceTypeId = id.intValue();
    }

    // Enums
    public enum ServiceCategory {
        PASSPORT, VISA
    }

    public enum PassportType {
        NEW, RENEWAL
    }

    // Override methods
    @Override
    public String toString() {
        return "ServiceType{" +
                "serviceTypeId=" + serviceTypeId +
                ", serviceName='" + serviceName + '\'' +
                ", serviceCategory=" + serviceCategory +
                ", passportType=" + passportType +
                ", amount=" + amount +
                ", processingDays=" + processingDays +
                '}';
    }
}