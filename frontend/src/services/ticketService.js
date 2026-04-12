import axiosClient from '../api/axiosClient';

const TICKETS_URL = '/tickets';

const ticketService = {
  createTicket: (payload) => axiosClient.post(TICKETS_URL, payload)
};

export default ticketService;
