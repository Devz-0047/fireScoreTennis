import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchPlayers = async () => {
    const response = await api.get('/api/players/');
    return response.data;
};
