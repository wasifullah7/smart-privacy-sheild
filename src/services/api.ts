/* ==========================================================================
   Smart Privacy Shield - API Service
   ========================================================================== */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '@/types';

// API Base URL - will be configured for backend later
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Create configured Axios instance
 */
const createApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Add auth token if available
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Log requests in development
            if (process.env.NODE_ENV === 'development') {
                console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
            }

            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError<ApiError>) => {
            // Handle common errors
            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 401:
                        // Handle unauthorized - clear token and redirect
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('auth_token');
                            // Could dispatch logout action or redirect here
                        }
                        break;
                    case 403:
                        console.error('[API] Forbidden access');
                        break;
                    case 404:
                        console.error('[API] Resource not found');
                        break;
                    case 500:
                        console.error('[API] Server error');
                        break;
                    default:
                        console.error(`[API] Error ${status}:`, data?.message || 'Unknown error');
                }
            } else if (error.request) {
                console.error('[API] Network error - no response received');
            } else {
                console.error('[API] Request configuration error:', error.message);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

// Export configured API instance
export const api = createApiInstance();

// Export base URL for reference
export { API_BASE_URL };
