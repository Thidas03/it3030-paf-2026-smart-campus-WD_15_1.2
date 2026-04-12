package com.smartcampus.dto;

import com.smartcampus.model.ResourceStatus;
import com.smartcampus.model.ResourceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRequestDTO {
    private String name;
    private ResourceType type;
    private Integer capacity;
    private String location;
    private String availabilityStartTime;
    private String availabilityEndTime;
    private ResourceStatus status;
}
