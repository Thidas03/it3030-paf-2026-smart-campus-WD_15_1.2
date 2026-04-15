package com.smartcampus.dto;

import com.smartcampus.model.ResourceType;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class ResourceDashboardStatsDTO {
    private int totalResources;
    private int activeResources;
    private int maintenanceResources;
    private int outOfServiceResources;
    private Map<ResourceType, Long> resourcesByType;
}
