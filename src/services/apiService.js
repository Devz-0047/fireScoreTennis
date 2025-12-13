import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchPlayers = async () => {
    const response = await api.get('/api/players/');
    return response.data;
};

export const fetchPlayer = async (id) => {
    const response = await api.get(`/api/players/${id}`);
    return response.data;
};
