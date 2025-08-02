package com.pms.passport_visa_service.ServiceImpl;


import com.pms.passport_visa_service.Entity.ServiceType;
import com.pms.passport_visa_service.Repository.ServiceTypeRepository;
import com.pms.passport_visa_service.Service.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceTypeServiceImpl implements ServiceTypeService {

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Override
    public List<ServiceType> getAllServiceTypes() {
        return serviceTypeRepository.findAll();
    }

    @Override
    public Optional<ServiceType> getServiceTypeById(Integer id) {
        return serviceTypeRepository.findById(id);
    }

    @Override
    public ServiceType createServiceType(ServiceType serviceType) {
        return serviceTypeRepository.save(serviceType);
    }

    @Override
    public ServiceType updateServiceType(Integer id, ServiceType serviceType) {
        if (serviceTypeRepository.existsById(id)) {
            serviceType.setId(id);
            return serviceTypeRepository.save(serviceType);
        }
        throw new RuntimeException("ServiceType not found with id: " + id);
    }

    @Override
    public void deleteServiceType(Integer id) {
        if (serviceTypeRepository.existsById(id)) {
            serviceTypeRepository.deleteById(id);
        } else {
            throw new RuntimeException("ServiceType not found with id: " + id);
        }
    }
}