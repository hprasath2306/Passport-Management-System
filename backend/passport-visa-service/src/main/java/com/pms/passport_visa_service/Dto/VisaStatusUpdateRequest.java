package com.pms.passport_visa_service.Dto;

import com.pms.passport_visa_service.Entity.VisaApplication;
import jakarta.validation.constraints.NotNull;

public class VisaStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private VisaApplication.ApplicationStatus status;

    private String cancellationComment;

    public VisaStatusUpdateRequest() {}

    public VisaStatusUpdateRequest(VisaApplication.ApplicationStatus status, String cancellationComment) {
        this.status = status;
        this.cancellationComment = cancellationComment;
    }

    public VisaApplication.ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(VisaApplication.ApplicationStatus status) {
        this.status = status;
    }

    public String getCancellationComment() {
        return cancellationComment;
    }

    public void setCancellationComment(String cancellationComment) {
        this.cancellationComment = cancellationComment;
    }
}