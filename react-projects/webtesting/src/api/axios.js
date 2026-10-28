import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: `${baseUrl}/`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add token automatically to every request
// // api.interceptors.request.use(
// //     (config) => {
// //         const token = localStorage.getItem("accessToken");

// //         if (token) {
// //             config.headers.Authorization = `Bearer ${token}`;
// //         }

// //         return config;
// //     },
// //     (error) => Promise.reject(error)
// // );

// // // Handle expired/invalid token
// // api.interceptors.response.use(
// //     (response) => response,
// //     (error) => {
// //         if (error.response?.status === 401) {
// //             localStorage.removeItem("accessToken");
// //             localStorage.removeItem("user");

// //             // Only redirect if currently on a protected page
// //             if (window.location.pathname === "/dashboard") {
// //                 window.location.href = "/login";
// //             }
// //         }

// //         return Promise.reject(error);
// //     }
// );

export default api;