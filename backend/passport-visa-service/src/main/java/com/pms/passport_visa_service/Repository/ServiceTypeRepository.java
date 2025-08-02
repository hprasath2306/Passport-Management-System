package com.pms.passport_visa_service.Repository;

import com.pms.passport_visa_service.Entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Integer> {
    Optional<ServiceType> findByPassportTypeAndServiceCategory(ServiceType.PassportType passportType, ServiceType.ServiceCategory serviceCategory);
}
