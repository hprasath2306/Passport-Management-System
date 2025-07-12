package com.pms.user_service.Repository;

import com.pms.user_service.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.customerId = :identifier OR u.phoneNumber = :identifier")
    Optional<User> findByCustomerIdOrPhoneNumber(@Param("identifier") String customerId, @Param("identifier") String phoneNumber);
}
