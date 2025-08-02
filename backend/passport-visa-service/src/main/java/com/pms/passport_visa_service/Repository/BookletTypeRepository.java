package com.pms.passport_visa_service.Repository;

import com.pms.passport_visa_service.Entity.BookletType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookletTypeRepository extends JpaRepository<BookletType, Integer> {
}
