import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

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
        const email = 'test@example.com';
        const password = 'test1234';

        apiClient.post('/login', { email, password }).then(response => {
            localStorage.setItem('access_token', response.data.token);
        });

        return error.response.status === 401;
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        return Promise.reject(error);
    }
);

export default apiClient;