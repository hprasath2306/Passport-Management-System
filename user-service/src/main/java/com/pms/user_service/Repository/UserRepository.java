package com.pms.user_service.Repository;

import com.pms.user_service.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailVerificationToken(String token);

    @Query("SELECT u FROM User u WHERE u.emailVerificationToken = :token AND u.emailVerificationTokenExpiry > :now")
    Optional<User> findByValidVerificationToken(@Param("token") String token, @Param("now") LocalDateTime now);

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
}