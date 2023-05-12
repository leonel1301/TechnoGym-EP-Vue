import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/health-checks";

export default {
  async getList() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getHealthCheck(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
};