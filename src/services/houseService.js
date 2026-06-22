import axiosClient from "../api/axiosClient";

export const houseService = {
  getAll: async () => {
    const response = await axiosClient.get("/houses");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/houses/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosClient.post("/houses", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosClient.put(`/houses/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosClient.delete(`/houses/${id}`);
    return response.data;
  },
};
