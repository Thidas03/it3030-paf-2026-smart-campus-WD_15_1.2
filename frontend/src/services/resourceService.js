import axios from "axios";

// Node target: Backend Operations Center
const API_BASE = "http://localhost:8081/api/resources";

const resourceService = {
  getAllResources: () => axios.get(API_BASE),
  getResourceById: (id) => axios.get(`${API_BASE}/${id}`),
  createResource: (data) => axios.post(API_BASE, data),
  updateResource: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  deleteResource: (id) => axios.delete(`${API_BASE}/${id}`)
};

export default resourceService;
