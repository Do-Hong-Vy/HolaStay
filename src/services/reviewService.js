import axiosClient from "../api/axiosClient";

export const reviewService = {
  getAll: async () => {
    const response = await axiosClient.get("/reviews");
    return response.data;
  },

  getByHouseId: async (houseId) => {
    const response = await axiosClient.get(`/reviews?houseId=${houseId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosClient.post("/reviews", data);
    return response.data;
  },
};
