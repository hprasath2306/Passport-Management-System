package com.pms.passport_visa_service.Service;

import com.pms.passport_visa_service.Entity.VisaApplication;

import java.util.List;

public interface VisaApplicationService {

    VisaApplication applyVisa(VisaApplication visaApplication);

    VisaApplication getVisaById(String visaId);

    List<VisaApplication> getVisasByUserId(String userId);

    List<VisaApplication> getVisasByPassportNumber(String passportNumber);

    VisaApplication updateVisaStatus(String visaId,
                                     VisaApplication.ApplicationStatus status,
                                     String cancellationComment);

    List<VisaApplication> getAllVisaApplications();

    boolean validatePassportForVisa(String passportNumber);

    String generateVisaId();
}
