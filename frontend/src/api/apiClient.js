import axios from "axios";

// Central API URL used by every frontend service call.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const unwrap = (response) => response.data.data;

// Resource-specific functions keep Axios details out of React pages.
export const clubApi = {
  async list(params) {
    const response = await apiClient.get("/clubs", { params });
    return unwrap(response);
  },
  async create(payload) {
    const response = await apiClient.post("/clubs", payload);
    return unwrap(response);
  },
  async update(id, payload) {
    const response = await apiClient.put(`/clubs/${id}`, payload);
    return unwrap(response);
  },
  async remove(id) {
    const response = await apiClient.delete(`/clubs/${id}`);
    return unwrap(response);
  },
  async favourite(id) {
    const response = await apiClient.patch(`/clubs/${id}/favourite`);
    return unwrap(response);
  }
};

export const eventApi = {
  async list(params) {
    const response = await apiClient.get("/events", { params });
    return unwrap(response);
  },
  async create(payload) {
    const response = await apiClient.post("/events", payload);
    return unwrap(response);
  },
  async update(id, payload) {
    const response = await apiClient.put(`/events/${id}`, payload);
    return unwrap(response);
  },
  async remove(id) {
    const response = await apiClient.delete(`/events/${id}`);
    return unwrap(response);
  },
  async rsvp(id) {
    const response = await apiClient.patch(`/events/${id}/rsvp`);
    return unwrap(response);
  },
  async cancelRsvp(id) {
    const response = await apiClient.patch(`/events/${id}/cancel-rsvp`);
    return unwrap(response);
  }
};

export const statsApi = {
  async get() {
    const response = await apiClient.get("/stats");
    return unwrap(response);
  }
};

export function getApiErrorMessage(error) {
  const data = error.response?.data;

  if (data?.details?.length) {
    return data.details.join(" ");
  }

  if (data?.message) {
    return data.message;
  }

  return `Unable to reach the UniClub Hub API at ${API_BASE_URL}. Start the backend with npm run dev and confirm the frontend .env uses the same port.`;
}
