import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://hostelhub.niitwebdev.com.ng/hotelhub-api/admin";

const api = axios.create({
    baseURL: baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`,
});

// Automatically format plain objects to FormData so PHP $_POST can receive them
api.interceptors.request.use(
    (config) => {
        // If data is a plain JavaScript object (and not already FormData, URLSearchParams, etc.)
        if (config.data && !(config.data instanceof FormData) && typeof config.data === "object") {
            const formData = new FormData();
            Object.entries(config.data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });
            config.data = formData;
        }

        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Clean up any trailing semicolons or whitespace from raw PHP response strings
api.interceptors.response.use(
    (response) => {
        if (typeof response.data === "string") {
            const trimmed = response.data.trim();
            if (
                (trimmed.startsWith("{") && trimmed.includes("}")) ||
                (trimmed.startsWith("[") && trimmed.includes("]"))
            ) {
                try {
                    const cleanJson = trimmed.replace(/;+\s*$/, "");
                    response.data = JSON.parse(cleanJson);
                } catch {
                    // Retain response.data as string if parse fails
                }
            }
        }
        return response;
    },
    (error) => {
        if (error.response && typeof error.response.data === "string") {
            const trimmed = error.response.data.trim();
            if (
                (trimmed.startsWith("{") && trimmed.includes("}")) ||
                (trimmed.startsWith("[") && trimmed.includes("]"))
            ) {
                try {
                    const cleanJson = trimmed.replace(/;+\s*$/, "");
                    error.response.data = JSON.parse(cleanJson);
                } catch {
                    // Ignore
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
