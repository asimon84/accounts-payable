import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const email = 'test@example.com';
const password = 'test1234';

const fetchToken = async () => {
    const response = await axios.post('/login', {email, password});
    localStorage.setItem('access_token', response.data.token);
};

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
        if (!localStorage.getItem('access_token')) {
            fetchToken();
        }

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