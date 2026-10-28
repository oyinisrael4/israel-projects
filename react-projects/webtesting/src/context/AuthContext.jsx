import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, []);

    // LOGIN
    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email,
            emailAddress: email,
            password,
        });

        const { accessToken, user } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);

        return response.data;
    };

    // SIGNUP
    const signUp = async (fullName, emailAddress, phoneNumber, password) => {
        const response = await api.post("/auth/sign-up", {
            fullName,
            emailAddress,
            phoneNumber,
            password,
        });

        return response.data;
    };

    // FORGOT PASSWORD
    const forgotPassword = async (email) => {
        const response = await api.post("/auth/forgot-password", {
            email,
            emailAddress: email,
        });

        return response.data;
    };

    // RESET PASSWORD
    const resetPassword = async (email, otp, password, confirmPassword) => {
        const response = await api.post("/auth/reset-password", {
            email,
            emailAddress: email,
            otp,
            otpCode: otp,
            password,
            confirmPassword,
            confirmedPassword: confirmPassword,
        });

        return response.data;
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signUp,
        forgotPassword,
        resetPassword,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};