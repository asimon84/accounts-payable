import React, { useState, useEffect } from 'react';
import axios from 'axios';

// async function getToken() {
//     try {
//         const [token, setToken] = useState(null);
//
//         setToken(localStorage.getItem('access_token'));
//
//         if (token === null) {
//             const email = 'test@example.com';
//             const password = 'test1234';
//             await axios.post(`/api/login`, { email, password }).then(response => {
//                 localStorage.setItem('access_token', response.data.token);
//                 setToken(response.data.token);
//                 // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//             });
//         } else {
//             // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         }
//     } catch (error) {
//         console.error('Error obtaining token:', error);
//     }
// }

// async function getCsrfCookie() {
//     try {
//         await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
//
//         // console.log('CSRF cookie obtained successfully.');
//     } catch (error) {
//         // console.error('Error obtaining CSRF cookie:', error);
//     }
// }

// console.log(localStorage.getItem('access_token'));

// getToken();

function ApiClient() {
    const [token, setToken] = useState(null);
    const email = 'test@example.com';
    const password = 'test1234';

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post(`/api/login`, { email, password }).then(response => {
                    localStorage.setItem('access_token', response.data.token);
                    setToken(response.data.token);
                });
            } catch (err) {
                // setError(err);
            }
        };

        fetchData();
    }, []);

    return axios.create({
        baseURL: '/api',
        withCredentials: true,
        headers: {
            'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
}

export default ApiClient;