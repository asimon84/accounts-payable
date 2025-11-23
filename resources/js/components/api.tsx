import axios from 'axios';

// const token = localStorage.getItem('authToken'); // Or retrieve from your state
//
// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// async function getCsrfCookie() {
//     try {
//         await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
//         console.log('CSRF cookie obtained successfully.');
//     } catch (error) {
//         console.error('Error obtaining CSRF cookie:', error);
//     }
// }

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
    },
});

export default apiClient;