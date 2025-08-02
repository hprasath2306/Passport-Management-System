package com.pms.passport_visa_service.Service;

import com.pms.passport_visa_service.Entity.VisaCancellation;

import java.util.List;

public interface VisaCancellationService {

    VisaCancellation requestCancellation(VisaCancellation visaCancellation);

    VisaCancellation updateCancellationStatus(Long cancellationId, VisaCancellation.CancellationStatus status);

    List<VisaCancellation> getAllCancellations();

    List<VisaCancellation> getCancellationsByUserId(String userId);

    List<VisaCancellation> getCancellationsByApplicationId(Integer visaApplicationId);
}

