package com.smartcampus.service;

import com.smartcampus.dto.ResourceRequestDTO;
import com.smartcampus.dto.ResourceResponseDTO;
import com.smartcampus.model.ResourceType;

import java.util.List;

public interface ResourceService {
    ResourceResponseDTO createResource(ResourceRequestDTO request);
    List<ResourceResponseDTO> getAllResources();
    ResourceResponseDTO getResourceById(String id);
    ResourceResponseDTO updateResource(String id, ResourceRequestDTO request);
    void deleteResource(String id);
    List<ResourceResponseDTO> searchByType(ResourceType type);
    List<ResourceResponseDTO> filterByCapacity(Integer capacity);
}
