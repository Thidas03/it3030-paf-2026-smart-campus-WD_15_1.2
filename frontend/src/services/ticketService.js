import axiosClient from '../api/axiosClient';

const TICKETS_URL = '/tickets';

const ticketService = {
  createTicket: (payload) => axiosClient.post(TICKETS_URL, payload),
  getTechnicianTickets: (technicianId) => axiosClient.get(`${TICKETS_URL}/technician/${technicianId}`),
  updateTicketStatus: (ticketId, status) => axiosClient.patch(`${TICKETS_URL}/${ticketId}/status`, { status }),
  assignTicket: (ticketId, technicianId) => axiosClient.patch(`${TICKETS_URL}/${ticketId}/assign`, { technicianId }),
  getAllTickets: () => axiosClient.get(TICKETS_URL)
};

export default ticketService;
