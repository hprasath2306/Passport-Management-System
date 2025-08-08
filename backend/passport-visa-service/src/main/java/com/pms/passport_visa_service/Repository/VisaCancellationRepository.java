package com.pms.passport_visa_service.Repository;

import com.pms.passport_visa_service.Entity.VisaCancellation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisaCancellationRepository extends JpaRepository<VisaCancellation, Long> {
    List<VisaCancellation> findByUserId(String userId);
    List<VisaCancellation> findByVisaApplicationId(String visaApplicationId);
}
