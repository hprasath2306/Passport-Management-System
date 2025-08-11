package com.pms.passport_visa_service.Dto;

import com.pms.passport_visa_service.Entity.PassportApplication;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {

    @NotNull(message = "Status is required")
    private PassportApplication.ApplicationStatus status;

    private String cancellationComment;

    public StatusUpdateRequest() {}

    public StatusUpdateRequest(PassportApplication.ApplicationStatus status, String cancellationComment) {
        this.status = status;
        this.cancellationComment = cancellationComment;
    }

    public PassportApplication.ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(PassportApplication.ApplicationStatus status) {
        this.status = status;
    }

    public String getCancellationComment() {
        return cancellationComment;
    }

    public void setCancellationComment(String cancellationComment) {
        this.cancellationComment = cancellationComment;
    }
}
