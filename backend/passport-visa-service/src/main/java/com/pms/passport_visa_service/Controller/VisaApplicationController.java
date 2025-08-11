package com.pms.passport_visa_service.Controller;

import com.pms.passport_visa_service.Dto.VisaStatusUpdateRequest;
import com.pms.passport_visa_service.Entity.VisaApplication;
import com.pms.passport_visa_service.Service.VisaApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visa")
public class VisaApplicationController {

    @Autowired
    private VisaApplicationService visaApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<VisaApplication> applyVisa(@RequestBody VisaApplication visaApplication) {
        VisaApplication savedVisa = visaApplicationService.applyVisa(visaApplication);
        return new ResponseEntity<>(savedVisa, HttpStatus.CREATED);
    }

    @GetMapping("/{visaId}")
    public ResponseEntity<VisaApplication> getVisaById(@PathVariable String visaId) {
        VisaApplication visa = visaApplicationService.getVisaById(visaId);
        return new ResponseEntity<>(visa, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<VisaApplication>> getVisasByUserId(@PathVariable String userId) {
        List<VisaApplication> visas = visaApplicationService.getVisasByUserId(userId);
        return new ResponseEntity<>(visas, HttpStatus.OK);
    }

    @GetMapping("/passport/{passportNumber}")
    public ResponseEntity<List<VisaApplication>> getVisasByPassportNumber(@PathVariable String passportNumber) {
        List<VisaApplication> visas = visaApplicationService.getVisasByPassportNumber(passportNumber);
        return new ResponseEntity<>(visas, HttpStatus.OK);
    }

    @PutMapping("/{visaId}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<VisaApplication> updateVisaStatus(
            @PathVariable String visaId,
            @Valid @RequestBody VisaStatusUpdateRequest statusRequest) {
        VisaApplication updatedVisa = visaApplicationService.updateVisaStatus(
                visaId,
                statusRequest.getStatus(),
                statusRequest.getCancellationComment()
        );
        return new ResponseEntity<>(updatedVisa, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<VisaApplication>> getAllVisaApplications() {
        List<VisaApplication> visas = visaApplicationService.getAllVisaApplications();
        return new ResponseEntity<>(visas, HttpStatus.OK);
    }

    @GetMapping("/validate-passport/{passportNumber}")
    public ResponseEntity<Boolean> validatePassportForVisa(@PathVariable String passportNumber) {
        boolean isValid = visaApplicationService.validatePassportForVisa(passportNumber);
        return new ResponseEntity<>(isValid, HttpStatus.OK);
    }
}
