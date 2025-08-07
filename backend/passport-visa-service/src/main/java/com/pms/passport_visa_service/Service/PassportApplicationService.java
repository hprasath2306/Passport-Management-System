package com.pms.passport_visa_service.Service;

import com.pms.passport_visa_service.Entity.PassportApplication;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PassportApplicationService {
    PassportApplication applyPassport(PassportApplication application);
    PassportApplication renewPassport(String userId);
    ResponseEntity<Boolean> getPassportByUserId(String userId);
    List<PassportApplication> getAllApplications();
    PassportApplication getPassportById(String passportId);
    PassportApplication updateApplicationStatus(Integer applicationId, PassportApplication.ApplicationStatus status);
}
