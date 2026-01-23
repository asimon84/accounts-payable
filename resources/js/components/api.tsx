import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const email = import.meta.env.VITE_API_EMAIL;
const password = import.meta.env.VITE_API_PASS;

// useEffect(() => {
//     const fetchToken = async () => {
//         const response = await axios.post('/login', {email, password});
//         localStorage.setItem('access_token', response.data.token);
//     };
//
//     fetchToken();
// }, []);

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

axiosRetry(apiClient, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        apiClient.post('/login', { email, password }).then(response => {
            localStorage.setItem('access_token', response.data.token);
        });

        return error.response.status === 401;
    },
});

apiClient.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;