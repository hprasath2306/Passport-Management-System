package com.pms.passport_visa_service.Controller;

import com.pms.passport_visa_service.Entity.PassportApplication;
import com.pms.passport_visa_service.Service.PassportApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/passport")
public class PassportApplicationController {

    @Autowired
    private PassportApplicationService passportService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyPassport(@Valid @RequestBody PassportApplication application) {
        PassportApplication savedApplication = passportService.applyPassport(application);
        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }

    @PutMapping("/renew/{userId}")
    public ResponseEntity<?> renewPassport(@PathVariable String userId) {
        PassportApplication renewedPassport = passportService.renewPassport(userId);
        return new ResponseEntity<>(renewedPassport, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Boolean> getPassportByUserId(@PathVariable String userId) {
        return passportService.getPassportByUserId(userId);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<PassportApplication>> getAllApplications() {
        List<PassportApplication> applications = passportService.getAllApplications();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/{passportId}")
    public ResponseEntity<?> getPassportById(@PathVariable String passportId) {
        PassportApplication passport = passportService.getPassportById(passportId);
        return new ResponseEntity<>(passport, HttpStatus.OK);
    }

    @PutMapping("/status/{applicationId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Integer applicationId,
                                          @RequestParam PassportApplication.ApplicationStatus status) {
        PassportApplication updatedApplication = passportService.updateApplicationStatus(applicationId, status);
        return new ResponseEntity<>(updatedApplication, HttpStatus.OK);
    }
}
