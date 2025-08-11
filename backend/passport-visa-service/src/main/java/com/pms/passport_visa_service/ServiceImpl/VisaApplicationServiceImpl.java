package com.pms.passport_visa_service.ServiceImpl;

import com.pms.passport_visa_service.Dto.UserResponseDto;
import com.pms.passport_visa_service.Entity.PassportApplication;
import com.pms.passport_visa_service.Entity.VisaApplication;
import com.pms.passport_visa_service.Repository.PassportApplicationRepository;
import com.pms.passport_visa_service.Repository.VisaApplicationRepository;
import com.pms.passport_visa_service.Service.VisaApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class VisaApplicationServiceImpl implements VisaApplicationService {

    @Autowired
    private VisaApplicationRepository visaApplicationRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${user.service.url:lb://user-service}")
    private String userServiceUrl;

    @Autowired
    private PassportApplicationRepository passportApplicationRepository;

    @Override
    public VisaApplication applyVisa(VisaApplication visaApplication) {
        if (!validatePassportForVisa(visaApplication.getPassportId())) {
            throw new RuntimeException("Valid passport required for visa application");
        }

        if (hasActiveVisaForCountry(visaApplication.getUserId(),
                visaApplication.getDestinationCountry())) {
            throw new RuntimeException(
                    "User already has an active visa for " +
                            visaApplication.getDestinationCountry() +
                            ". Cannot apply for another visa until current visa expires."
            );
        }

        visaApplication.setVisaId(generateVisaId());
        visaApplication.setApplicationDate(LocalDate.now());

        UserResponseDto userDetails = fetchUserDetails(visaApplication.getUserId());

        // Set user details in visa application
        visaApplication.setUserFirstName(userDetails.getFirstName());
        visaApplication.setUserLastName(userDetails.getLastName());
        visaApplication.setUserPhone(userDetails.getPhoneNumber());
        visaApplication.setUserEmail(userDetails.getEmail());
        visaApplication.setUserOccupation(userDetails.getOccupation());

        // Calculate visa validity based on occupation
        double validityYears = getVisaValidityByOccupation(userDetails.getOccupation());
        visaApplication.setValidityYears(BigDecimal.valueOf(validityYears));
        visaApplication.setIssueDate(LocalDate.now());

        long years = (long) validityYears;
        double fractional = validityYears - years;
        long months = Math.round(fractional * 12);

        LocalDate expiryDate = LocalDate.now().plusYears(years).plusMonths(months);
        visaApplication.setExpiryDate(expiryDate);


        return visaApplicationRepository.save(visaApplication);
    }

    @Override
    public VisaApplication getVisaById(String visaId) {
        Optional<VisaApplication> visa = visaApplicationRepository.findByVisaId(visaId);
        return visa.orElseThrow(() -> new RuntimeException("Visa not found with ID: " + visaId));
    }

    @Override
    public List<VisaApplication> getVisasByUserId(String userId) {
        return visaApplicationRepository.findByUserId(userId);
    }

    @Override
    public List<VisaApplication> getVisasByPassportNumber(String passportNumber) {
        return visaApplicationRepository.findByPassportNumber(passportNumber);
    }

    @Override
    public VisaApplication updateVisaStatus(String visaId,
                                            VisaApplication.ApplicationStatus status,
                                            String cancellationComment) {
        VisaApplication visa = visaApplicationRepository.findByVisaId(visaId)
                .orElseThrow(() -> new RuntimeException("Visa not found with ID: " + visaId));

        // Validate cancellation comment if status is CANCELLED
        if (status == VisaApplication.ApplicationStatus.CANCELLED) {
            if (cancellationComment == null || cancellationComment.trim().isEmpty()) {
                throw new RuntimeException("Cancellation comment is required when cancelling a visa application");
            }
            visa.setCancellationComment(cancellationComment.trim());
        } else {
            // Clear cancellation comment if status is not CANCELLED
            visa.setCancellationComment(null);
        }

        visa.setStatus(status);
        return visaApplicationRepository.save(visa);
    }

    @Override
    public List<VisaApplication> getAllVisaApplications() {
        return visaApplicationRepository.findAll();
    }

    @Override
    public boolean validatePassportForVisa(String passportNumber) {
        // Logic to validate if passport exists and is valid
        PassportApplication passport = passportApplicationRepository.findByPassportId(passportNumber)
                .orElseThrow(() -> new RuntimeException("Passport not found with number: " + passportNumber));
        return passport.getExpiryDate().isAfter(LocalDate.now());
    }

    @Override
    public String generateVisaId() {
        Random random = new Random();
        int randomNumber = 1000 + random.nextInt(9000);
        return "VISA-" + randomNumber;
    }

    private boolean hasActiveVisaForCountry(String userId, String destinationCountry) {
        List<VisaApplication> userVisas = visaApplicationRepository.findByUserId(userId);
        LocalDate currentDate = LocalDate.now();

        return userVisas.stream()
                .anyMatch(visa ->
                        visa.getDestinationCountry().equalsIgnoreCase(destinationCountry) &&
                                visa.getExpiryDate().isAfter(currentDate) &&
                                (visa.getStatus() == VisaApplication.ApplicationStatus.ISSUED ||
                                        visa.getStatus() == VisaApplication.ApplicationStatus.PENDING)
                );
    }

    private UserResponseDto fetchUserDetails(String userId) {
        try {
            String url = userServiceUrl + "/api/users/" + userId;
            return restTemplate.getForObject(url, UserResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch user details " + e.getMessage());
        }
    }

    private double getVisaValidityByOccupation(String occupation) {
        switch (occupation.toUpperCase()) {
            case "STUDENT":
                return 2.0;
            case "PRIVATE_EMPLOYEE":
                return 3.0;
            case "GOVERNMENT_EMPLOYEE":
                return 4.0;
            case "SELF_EMPLOYED":
                return 1.0;
            case "RETIRED_EMPLOYEE":
                return 1.5;
            default:
                throw new RuntimeException("Invalid occupation type: " + occupation);
        }
    }
}
