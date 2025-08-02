package com.pms.passport_visa_service.Repository;

import com.pms.passport_visa_service.Entity.PassportApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PassportApplicationRepository extends JpaRepository<PassportApplication, Integer> {
    Optional<PassportApplication> findByUserId(String userId);
    Optional<PassportApplication> findByPassportId(String passportId);
    boolean existsByUserId(String userId);
}
