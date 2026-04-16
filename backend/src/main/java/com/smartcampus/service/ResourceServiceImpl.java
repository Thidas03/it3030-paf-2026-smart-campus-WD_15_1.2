package com.smartcampus.service;

import com.smartcampus.dto.ResourceRequestDTO;
import com.smartcampus.dto.ResourceResponseDTO;
import com.smartcampus.model.Resource;
import com.smartcampus.model.ResourceStatus;
import com.smartcampus.model.ResourceType;
import com.smartcampus.dto.ResourceDashboardStatsDTO;
import com.smartcampus.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;

    @Override
    public ResourceResponseDTO createResource(ResourceRequestDTO request) {
        Resource resource = Resource.builder()
                .name(request.getName())
                .type(request.getType())
                .capacity(request.getCapacity())
                .location(request.getLocation())
                .availabilityStartTime(request.getAvailabilityStartTime())
                .availabilityEndTime(request.getAvailabilityEndTime())
                .status(request.getStatus())
                .createdAt(LocalDateTime.now())
                .build();

        Resource savedResource = resourceRepository.save(resource);
        return mapToResponseDTO(savedResource);
    }

    @Override
    public List<ResourceResponseDTO> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ResourceResponseDTO getResourceById(String id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
        return mapToResponseDTO(resource);
    }

    @Override
    public ResourceResponseDTO updateResource(String id, ResourceRequestDTO request) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));

        resource.setName(request.getName());
        resource.setType(request.getType());
        resource.setCapacity(request.getCapacity());
        resource.setLocation(request.getLocation());
        resource.setAvailabilityStartTime(request.getAvailabilityStartTime());
        resource.setAvailabilityEndTime(request.getAvailabilityEndTime());
        resource.setStatus(request.getStatus());

        Resource updatedResource = resourceRepository.save(resource);
        return mapToResponseDTO(updatedResource);
    }

    @Override
    public void deleteResource(String id) {
        resourceRepository.deleteById(id);
    }

    @Override
    public List<ResourceResponseDTO> searchByType(ResourceType type) {
        return resourceRepository.findByType(type).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ResourceResponseDTO> filterByCapacity(Integer capacity) {
        return resourceRepository.findByCapacityGreaterThanEqual(capacity).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ResourceDashboardStatsDTO getDashboardStats() {
        List<Resource> resources = resourceRepository.findAll();

        int total = resources.size();
        int active = (int) resources.stream().filter(r -> r.getStatus() == ResourceStatus.ACTIVE).count();
        int maintenance = (int) resources.stream().filter(r -> r.getStatus() == ResourceStatus.MAINTENANCE).count();
        int outOfService = (int) resources.stream().filter(r -> r.getStatus() == ResourceStatus.OUT_OF_SERVICE).count();

        Map<ResourceType, Long> byType = resources.stream()
                .collect(Collectors.groupingBy(Resource::getType, Collectors.counting()));

        return ResourceDashboardStatsDTO.builder()
                .totalResources(total)
                .activeResources(active)
                .maintenanceResources(maintenance)
                .outOfServiceResources(outOfService)
                .resourcesByType(byType)
                .build();
    }

    private ResourceResponseDTO mapToResponseDTO(Resource resource) {
        return ResourceResponseDTO.builder()
                .id(resource.getId())
                .name(resource.getName())
                .type(resource.getType())
                .capacity(resource.getCapacity())
                .location(resource.getLocation())
                .availabilityStartTime(resource.getAvailabilityStartTime())
                .availabilityEndTime(resource.getAvailabilityEndTime())
                .status(resource.getStatus())
                .createdAt(resource.getCreatedAt())
                .build();
    }
}
