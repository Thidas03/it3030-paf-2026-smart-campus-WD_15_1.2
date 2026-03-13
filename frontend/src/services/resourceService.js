import axiosClient from "../api/axiosClient";

// The endpoint on the Spring Boot backend
const RESOURCE_URL = "/resources";

const resourceService = {
  getAllResources: () => axiosClient.get(RESOURCE_URL),
  getResourceById: (id) => axiosClient.get(`${RESOURCE_URL}/${id}`),
  createResource: (data) => axiosClient.post(RESOURCE_URL, data),
  updateResource: (id, data) => axiosClient.put(`${RESOURCE_URL}/${id}`, data),
  deleteResource: (id) => axiosClient.delete(`${RESOURCE_URL}/${id}`)
};

export default resourceService;
