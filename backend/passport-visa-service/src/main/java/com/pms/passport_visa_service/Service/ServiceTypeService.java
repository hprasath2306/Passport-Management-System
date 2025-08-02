package com.pms.passport_visa_service.Service;

import com.pms.passport_visa_service.Entity.ServiceType;
import java.util.List;
import java.util.Optional;

public interface ServiceTypeService {
    List<ServiceType> getAllServiceTypes();
    Optional<ServiceType> getServiceTypeById(Integer id);
    ServiceType createServiceType(ServiceType serviceType);
    ServiceType updateServiceType(Integer id, ServiceType serviceType);
    void deleteServiceType(Integer id);
}