package com.pms.passport_visa_service.ServiceImpl;

import com.pms.passport_visa_service.Entity.VisaApplication;
import com.pms.passport_visa_service.Entity.VisaCancellation;
import com.pms.passport_visa_service.Repository.VisaApplicationRepository;
import com.pms.passport_visa_service.Repository.VisaCancellationRepository;
import com.pms.passport_visa_service.Service.VisaCancellationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class VisaCancellationServiceImpl implements VisaCancellationService {

    @Autowired
    private VisaCancellationRepository cancellationRepository;

    @Autowired
    private VisaApplicationRepository visaApplicationRepository;

    @Override
    public VisaCancellation requestCancellation(VisaCancellation visaCancellation) {
        VisaApplication visa = visaApplicationRepository
                .findByVisaId((visaCancellation.getVisaApplicationId()))
                .orElseThrow(() -> new RuntimeException("Visa application not found"));

        if (visa.getStatus() == VisaApplication.ApplicationStatus.CANCELLED) {
            throw new RuntimeException("Visa already cancelled");
        }

        // Update visa status
        visa.setStatus(VisaApplication.ApplicationStatus.CANCELLED);
        visaApplicationRepository.save(visa);

        // Set cancellation date if not provided
        visaCancellation.setCancellationDate(LocalDate.now());

        // Simple refund logic (e.g., 50% if before issue date + 6 months)
        if (visa.getIssueDate() != null && LocalDate.now().isBefore(visa.getIssueDate().plusMonths(6))) {
            visaCancellation.setRefundAmount(visa.getAmountPaid().multiply(BigDecimal.valueOf(0.5)));
        } else {
            visaCancellation.setRefundAmount(BigDecimal.ZERO);
        }

        return cancellationRepository.save(visaCancellation);
    }

    @Override
    public List<VisaCancellation> getAllCancellations() {
        return cancellationRepository.findAll();
    }

    @Override
    public List<VisaCancellation> getCancellationsByUserId(String userId) {
        return cancellationRepository.findByUserId(userId);
    }

    @Override
    public List<VisaCancellation> getCancellationsByApplicationId(String visaApplicationId) {
        return cancellationRepository.findByVisaApplicationId(visaApplicationId);
    }
}
