import axios from 'axios'

const base_url = 'http://localhost:3000/api/v1/treadmills'

export default {
    async getTreadmills() {
      const response = await axios.get(base_url);
      return response.data;
    },
  
    async getItem(id) {
      const response = await axios.get(`${base_url}/${id}`);
      return response.data;
    },
  };