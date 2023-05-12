import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/centers";

export default {
  async getCenters() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async getCenter(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
};