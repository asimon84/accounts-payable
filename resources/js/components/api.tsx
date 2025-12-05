import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log('test1');
            // window.location.href = '/login';

            const email = 'test@example.com';
            const password = 'test1234';

            apiClient.post('/login', { email, password }).then(response => {
                localStorage.setItem('access_token', response.data.token);
            });
        }

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
        const { response } = error;

        if (response && response.status === 401) {
            localStorage.removeItem('access_token');
            console.log('test2');
            // window.location.href = '/login';

            const email = 'test@example.com';
            const password = 'test1234';

            apiClient.post('/login', { email, password }).then(response => {
                localStorage.setItem('access_token', response.data.token);
            });
        }

        return Promise.reject(error);
    }
);

export default apiClient;