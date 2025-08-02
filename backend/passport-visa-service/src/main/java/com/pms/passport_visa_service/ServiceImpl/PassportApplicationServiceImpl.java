package com.pms.passport_visa_service.ServiceImpl;

import com.pms.passport_visa_service.Entity.BookletType;
import com.pms.passport_visa_service.Entity.PassportApplication;
import com.pms.passport_visa_service.Entity.ServiceType;
import com.pms.passport_visa_service.Dto.UserResponseDto;
import com.pms.passport_visa_service.Repository.BookletTypeRepository;
import com.pms.passport_visa_service.Repository.PassportApplicationRepository;
import com.pms.passport_visa_service.Repository.ServiceTypeRepository;
import com.pms.passport_visa_service.Service.PassportApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class PassportApplicationServiceImpl implements PassportApplicationService {

    @Autowired
    private PassportApplicationRepository repository;

    @Autowired
    private BookletTypeRepository bookletTypeRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${user.service.url:lb://user-service}")
    private String userServiceUrl;

    @Override
    public PassportApplication applyPassport(PassportApplication application) {
        if (repository.existsByUserId(application.getUserId())) {
            throw new RuntimeException("Passport already applied for this user");
        }

        // Fetch user details from User microservice
        UserResponseDto userDetails = fetchUserDetails(application.getUserId());

        // Set user details in passport application
        application.setUserFirstName(userDetails.getFirstName());
        application.setUserLastName(userDetails.getLastName());
        application.setUserPhone(userDetails.getPhoneNumber());
        application.setUserEmail(userDetails.getEmail());
        application.setUserCitizenType(userDetails.getCitizenType());

        // Fetch BookletType from database
        BookletType bookletType = bookletTypeRepository.findById(application.getBookletTypeId())
                .orElseThrow(() -> new RuntimeException("Invalid booklet type ID: " + application.getBookletTypeId()));

        // Fetch ServiceType from database based on serviceTypeId and passportType
        ServiceType serviceType = getServiceTypeForPassport(application.getServiceTypeId(), application.getPassportType());

        // Generate passport ID based on booklet type
        String passportId = generatePassportId(bookletType);
        application.setPassportId(passportId);

        // Set application date to current date
        application.setApplicationDate(LocalDate.now());

        // Calculate processing days based on service type
        calculateDates(serviceType.getProcessingDays(), application);

        // Set amount from service type
        application.setAmountPaid(serviceType.getAmount());

        // Set initial status
        application.setStatus(PassportApplication.ApplicationStatus.PENDING);

        return repository.save(application);
    }

    public void calculateDates(Integer processingDaysFromService, PassportApplication application) {
        System.out.println(processingDaysFromService);
        System.out.println(application.getApplicationDate());
        if (application.getApplicationDate() != null && processingDaysFromService != null) {
            application.setProcessingDays(processingDaysFromService);
            application.setIssueDate(application.getApplicationDate().plusDays(processingDaysFromService));
            application.setExpiryDate(application.getIssueDate().plusYears(10)); // Standard 10 years validity
        } else {
            throw new IllegalArgumentException("Application date and processing days must be set before calculating dates.");
        }
    }

    @Override
    public PassportApplication renewPassport(String userId) {
        PassportApplication existingPassport = repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No existing passport found for user"));

        if (existingPassport.getExpiryDate().isAfter(LocalDate.now())) {
            throw new RuntimeException("Passport is still valid, cannot renew");
        }

        // Fetch BookletType from database
        BookletType bookletType = bookletTypeRepository.findById(existingPassport.getBookletTypeId())
                .orElseThrow(() -> new RuntimeException("Invalid booklet type ID: " + existingPassport.getBookletTypeId()));

        // Fetch ServiceType for renewal
        ServiceType serviceType = serviceTypeRepository
                .findByPassportTypeAndServiceCategory(ServiceType.PassportType.RENEWAL, ServiceType.ServiceCategory.PASSPORT)
                .orElseThrow(() -> new RuntimeException("No RENEWAL service type configured"));

        // Store previous passport ID
        String previousPassportId = existingPassport.getPassportId();

        // Update for renewal
        existingPassport.setPassportType(PassportApplication.PassportType.RENEWAL);
        existingPassport.setPreviousPassportId(previousPassportId);
        existingPassport.setApplicationDate(LocalDate.now());

        // Generate new passport ID
        String newPassportId = generatePassportId(bookletType);
        existingPassport.setPassportId(newPassportId);

        // Calculate new dates
        calculateDates(serviceType.getProcessingDays(), existingPassport);

        // Set renewal amount
        existingPassport.setAmountPaid(serviceType.getAmount());

        // Reset status
        existingPassport.setStatus(PassportApplication.ApplicationStatus.PENDING);

        return repository.save(existingPassport);
    }

    @Override
    public PassportApplication getPassportByUserId(String userId) {
        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Passport not found for user: " + userId));
    }

    @Override
    public List<PassportApplication> getAllApplications() {
        return repository.findAll();
    }

    @Override
    public PassportApplication getPassportById(String passportId) {
        return repository.findByPassportId(passportId)
                .orElseThrow(() -> new RuntimeException("Passport not found: " + passportId));
    }

    @Override
    public PassportApplication updateApplicationStatus(Integer applicationId, PassportApplication.ApplicationStatus status) {
        PassportApplication application = repository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found: " + applicationId));

        application.setStatus(status);
        return repository.save(application);
    }

    private UserResponseDto fetchUserDetails(String userId) {
        try {
            String url = userServiceUrl + "/api/user/" + userId;
            return restTemplate.getForObject(url, UserResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch user details: " + e.getMessage());
        }
    }

    private String generatePassportId(BookletType bookletType) {
        Random random = new Random();
        int randomNum = 1000 + random.nextInt(9000);

        // Use the format from BookletType entity
        return bookletType.getIdFormat().replace("XXXX", String.valueOf(randomNum));
    }

    private ServiceType getServiceTypeForPassport(Integer serviceTypeId, PassportApplication.PassportType passportType) {
        // Convert PassportApplication.PassportType to ServiceType.PassportType
        ServiceType.PassportType servicePassportType = ServiceType.PassportType.valueOf(passportType.name());

        // Find service type by ID first
        ServiceType serviceType = serviceTypeRepository.findById(serviceTypeId)
                .orElseThrow(() -> new RuntimeException("Invalid service type ID: " + serviceTypeId));

        // Verify the service type matches the passport type and is for PASSPORT category
        if (!serviceType.getServiceCategory().equals(ServiceType.ServiceCategory.PASSPORT)) {
            throw new RuntimeException("Service type is not for passport applications");
        }

        if (!serviceType.getPassportType().equals(servicePassportType)) {
            throw new RuntimeException("Service type does not match passport type: " + passportType);
        }

        return serviceType;
    }
}