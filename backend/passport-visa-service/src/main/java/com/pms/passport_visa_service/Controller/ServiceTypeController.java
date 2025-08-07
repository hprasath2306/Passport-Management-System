package com.pms.passport_visa_service.Controller;

import com.pms.passport_visa_service.Entity.ServiceType;
import com.pms.passport_visa_service.Service.ServiceTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/service-types")
public class ServiceTypeController {

    @Autowired
    private ServiceTypeService serviceTypeService;

    @GetMapping
    public ResponseEntity<List<ServiceType>> getAllServiceTypes() {
        List<ServiceType> serviceTypes = serviceTypeService.getAllServiceTypes();
        return ResponseEntity.ok(serviceTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceType> getServiceTypeById(@PathVariable Integer id) {
        Optional<ServiceType> serviceType = serviceTypeService.getServiceTypeById(id);
        return serviceType.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ServiceType> createServiceType(@Valid @RequestBody ServiceType serviceType) {
        ServiceType createdServiceType = serviceTypeService.createServiceType(serviceType);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdServiceType);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ServiceType> updateServiceType(@PathVariable Integer id,
                                                         @RequestBody ServiceType serviceType) {
        try {
            ServiceType updatedServiceType = serviceTypeService.updateServiceType(id, serviceType);
            return ResponseEntity.ok(updatedServiceType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteServiceType(@PathVariable Integer id) {
        try {
            serviceTypeService.deleteServiceType(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
