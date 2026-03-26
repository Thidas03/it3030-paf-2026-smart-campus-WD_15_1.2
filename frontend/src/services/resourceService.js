import axiosClient from "../api/axiosClient";

// The endpoint on the Spring Boot backend
const RESOURCE_URL = "/resources";

const processResource = (resource) => {
  if (resource.availabilityEndTime && new Date(resource.availabilityEndTime) < new Date()) {
    resource.status = 'OUT_OF_SERVICE';
  }
  return resource;
};

const filterOldResources = (resource) => {
  if (!resource.availabilityEndTime) return true;
  const end = new Date(resource.availabilityEndTime);
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  // Keep the resource if it's not older than 1 day past its end time
  return end >= oneDayAgo;
};

const resourceService = {
  getAllResources: async () => {
    const response = await axiosClient.get(RESOURCE_URL);
    if (response.data && Array.isArray(response.data)) {
      response.data = response.data
        .filter(filterOldResources)
        .map(processResource)
        .sort((a, b) => {
          const dateA = new Date(a.availabilityStartTime || 0);
          const dateB = new Date(b.availabilityStartTime || 0);
          return dateA - dateB;
        });
    }
    return response;
  },
  getResourceById: async (id) => {
    const response = await axiosClient.get(`${RESOURCE_URL}/${id}`);
    if (response.data) {
      response.data = processResource(response.data);
    }
    return response;
  },
  createResource: (data) => axiosClient.post(RESOURCE_URL, data),
  updateResource: (id, data) => axiosClient.put(`${RESOURCE_URL}/${id}`, data),
  deleteResource: (id) => axiosClient.delete(`${RESOURCE_URL}/${id}`)
};

export default resourceService;
