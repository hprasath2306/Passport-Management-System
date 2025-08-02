package com.pms.passport_visa_service.Repository;

import com.pms.passport_visa_service.Entity.VisaApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VisaApplicationRepository extends JpaRepository<VisaApplication, Long> {

    Optional<VisaApplication> findByVisaId(String visaId);

    List<VisaApplication> findByUserId(String userId);

    @Query("SELECT v FROM VisaApplication v WHERE v.passportId = :passportNumber")
    List<VisaApplication> findByPassportNumber(@Param("passportNumber") String passportNumber);

    @Query("SELECT v FROM VisaApplication v WHERE v.userId = :userId AND v.status = :status")
    List<VisaApplication> findByUserIdAndStatus(@Param("userId") String userId, @Param("status") String status);
}
