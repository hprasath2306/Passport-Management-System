package com.pms.passport_visa_service.Controller;

import com.pms.passport_visa_service.Entity.VisaCancellation;
import com.pms.passport_visa_service.Service.VisaCancellationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visa-cancellation")
public class VisaCancellationController {

    @Autowired
    private VisaCancellationService cancellationService;

    @PostMapping("/request")
    public ResponseEntity<VisaCancellation> requestCancellation(@RequestBody VisaCancellation visaCancellation) {
        VisaCancellation cancelled = cancellationService.requestCancellation(visaCancellation);
        return ResponseEntity.ok(cancelled);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<VisaCancellation>> getAllCancellations() {
        return ResponseEntity.ok(cancellationService.getAllCancellations());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<VisaCancellation>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(cancellationService.getCancellationsByUserId(userId));
    }

    @GetMapping("/application/{visaApplicationId}")
    public ResponseEntity<List<VisaCancellation>> getByApplication(@PathVariable String visaApplicationId) {
        return ResponseEntity.ok(cancellationService.getCancellationsByApplicationId(visaApplicationId));
    }
}
