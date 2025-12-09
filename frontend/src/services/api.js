import axios from 'axios';

const API_URL = 'https://tru-estate-backend-woad.vercel.app/api/sales';

export const fetchSales = async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
};

export const fetchFilters = async () => {
    const response = await axios.get(`${API_URL}/filters`);
    return response.data;
};
