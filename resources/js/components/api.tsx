import axios from 'axios';

const token = localStorage.getItem('authToken'); // Or retrieve from your state

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export default apiClient;