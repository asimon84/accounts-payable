import axios from 'axios';

const token = getToken();

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

async function getToken() {
    try {
        const email = 'test@example.com';
        const password = 'test1234';
        const response = await axios.post(`/api/login`, { email, password });

        localStorage.setItem('access_token', response.data.token);
        console.log(response);

        return response.data.token;
    } catch (error) {
        console.error('Error obtaining token:', error);
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

async function getCsrfCookie() {
    try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

        console.log('CSRF cookie obtained successfully.');
    } catch (error) {
        console.error('Error obtaining CSRF cookie:', error);
    }
}

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export default apiClient;