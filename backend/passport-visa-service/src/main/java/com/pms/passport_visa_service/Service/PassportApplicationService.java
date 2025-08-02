package com.pms.passport_visa_service.Service;

import com.pms.passport_visa_service.Entity.PassportApplication;
import java.util.List;

public interface PassportApplicationService {
    PassportApplication applyPassport(PassportApplication application);
    PassportApplication renewPassport(String userId);
    PassportApplication getPassportByUserId(String userId);
    List<PassportApplication> getAllApplications();
    PassportApplication getPassportById(String passportId);
    PassportApplication updateApplicationStatus(Integer applicationId, PassportApplication.ApplicationStatus status);
}
