package com.pms.passport_visa_service.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "visa_cancellations")
public class VisaCancellation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cancellation_id")
    private Integer cancellationId;

    @Column(name = "visa_application_id", nullable = false)
    private Integer visaApplicationId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "cancellation_date", nullable = false)
    private LocalDate cancellationDate;

    @Column(name = "cancellation_reason", columnDefinition = "TEXT")
    private String cancellationReason;

    @Column(name = "refund_amount")
    private BigDecimal refundAmount = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CancellationStatus status = CancellationStatus.REQUESTED;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Enum
    public enum CancellationStatus {
        REQUESTED, APPROVED, REJECTED
    }

    // Constructors
    public VisaCancellation() {}

    public VisaCancellation(Integer visaApplicationId, String userId, LocalDate cancellationDate, String cancellationReason) {
        this.visaApplicationId = visaApplicationId;
        this.userId = userId;
        this.cancellationDate = cancellationDate;
        this.cancellationReason = cancellationReason;
    }

    // Getters and Setters
    public Integer getCancellationId() {
        return cancellationId;
    }

    public void setCancellationId(Integer cancellationId) {
        this.cancellationId = cancellationId;
    }

    public Integer getVisaApplicationId() {
        return visaApplicationId;
    }

    public void setVisaApplicationId(Integer visaApplicationId) {
        this.visaApplicationId = visaApplicationId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getCancellationDate() {
        return cancellationDate;
    }

    public void setCancellationDate(LocalDate cancellationDate) {
        this.cancellationDate = cancellationDate;
    }

    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public BigDecimal getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(BigDecimal refundAmount) {
        this.refundAmount = refundAmount;
    }

    public CancellationStatus getStatus() {
        return status;
    }

    public void setStatus(CancellationStatus status) {
        this.status = status;
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
        return "VisaCancellation{" +
                "cancellationId=" + cancellationId +
                ", visaApplicationId=" + visaApplicationId +
                ", userId='" + userId + '\'' +
                ", cancellationDate=" + cancellationDate +
                ", cancellationReason='" + cancellationReason + '\'' +
                ", refundAmount=" + refundAmount +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
