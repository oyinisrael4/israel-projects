import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, []);

    // SIGN IN / LOGIN
    const login = async (emailAddress, password) => {
        const cleanEmail = (emailAddress || "").trim().toLowerCase();
        const cleanPassword = (password || "").trim();

        // Local development demo login only — enabled exclusively in dev mode via .env
        const demoEmail = import.meta.env.DEV ? (import.meta.env.VITE_DEMO_EMAIL || "").trim().toLowerCase() : "";
        const demoPassword = import.meta.env.DEV ? (import.meta.env.VITE_DEMO_PASSWORD || "").trim() : "";
        const isDemoLogin = Boolean(import.meta.env.DEV && demoEmail && demoPassword && cleanEmail === demoEmail && cleanPassword === demoPassword);

        const demoUser = isDemoLogin ? {
            staffId: "DEMO_STAFF_001",
            firstName: "Israel",
            lastName: "Oyinlola",
            emailAddress: demoEmail,
            roleName: "Super Admin",
            role: "Super Admin",
            statusName: "Active",
            lastLogin: new Date().toLocaleString(),
        } : null;

        try {
            const response = await api.post("auth/sign-in.php", {
                emailAddress: cleanEmail,
                email: cleanEmail,
                password: cleanPassword,
            });

            const responseData = response.data;

            if (responseData?.success === true) {
                const userData = responseData.data || responseData.user || {};
                const token = responseData.accessToken || userData.staffId || userData.id;

                const resolvedUser = {
                    ...userData,
                    firstName: userData.firstName
                        ? userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)
                        : "Israel",
                    lastName: userData.lastName
                        ? userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1)
                        : "Oyinlola",
                    roleName: userData.roleName || "Super Admin",
                    role: userData.roleName || "Super Admin",
                    statusName: userData.statusName || "Active",
                };

                if (token) {
                    localStorage.setItem("accessToken", token);
                }
                localStorage.setItem("user", JSON.stringify(resolvedUser));
                sessionStorage.setItem("userSession", JSON.stringify(responseData));

                setUser(resolvedUser);
                return responseData;
            }

            // Fallback for demo login in local development
            if (isDemoLogin && demoUser) {
                localStorage.setItem("accessToken", demoUser.staffId);
                localStorage.setItem("user", JSON.stringify(demoUser));
                sessionStorage.setItem("userSession", JSON.stringify({ success: true, data: demoUser }));
                setUser(demoUser);
                return {
                    success: true,
                    message: "STAFF LOGIN SUCCESSFUL",
                    data: demoUser,
                };
            }

            return responseData;
        } catch (err) {
            // Local development demo fallback when backend is unreachable
            if (isDemoLogin && demoUser) {
                localStorage.setItem("accessToken", demoUser.staffId);
                localStorage.setItem("user", JSON.stringify(demoUser));
                sessionStorage.setItem("userSession", JSON.stringify({ success: true, data: demoUser }));
                setUser(demoUser);
                return {
                    success: true,
                    message: "STAFF LOGIN SUCCESSFUL",
                    data: demoUser,
                };
            }
            throw err;
        }
    };

    // Role switcher (internal helper if needed)
    const switchRole = (newRole) => {
        const isCounselor = (newRole || "").toLowerCase().includes("counselor");
        const updated = {
            ...(user || {}),
            roleName: isCounselor ? "Counselor" : "Super Admin",
            role: isCounselor ? "Counselor" : "Super Admin",
        };
        localStorage.setItem("user", JSON.stringify(updated));
        setUser(updated);
    };

    // SIGN UP (Client-side demo only: stores registration details in sessionStorage; no backend endpoint)
    const signUp = (fullName, emailAddress, phoneNumber, password) => {
        sessionStorage.setItem("userSignUpSession", JSON.stringify({ fullName, emailAddress, phoneNumber }));
        return {
            success: true,
            message: "Registration Successful! Welcome to NIIT.",
        };
    };

    // FORGOT PASSWORD
    const forgotPassword = async (emailAddress) => {
        try {
            const response = await api.post("auth/forgot-password.php", {
                emailAddress,
            });
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Unable to process forgot password request. Please try again.";
            return {
                success: false,
                message: errorMessage,
            };
        }
    };

    // RESET PASSWORD
    const resetPassword = async (staffId, resetOtp, newPassword, confirmPassword) => {
        try {
            const response = await api.post("auth/reset-password.php", {
                staffId,
                resetOtp,
                newPassword,
                confirmPassword,
            });
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Unable to reset your password. Please try again.";
            return {
                success: false,
                message: errorMessage,
            };
        }
    };

    // DEMO LOGIN (Item 1b: Signs in "Demo Admin" locally without backend call)
    const loginAsDemo = () => {
        const demoUser = {
            staffId: "DEMO_ADMIN_001",
            firstName: "Demo",
            lastName: "Admin",
            name: "Demo Admin",
            emailAddress: "demo.admin@niitcorehub.local",
            roleName: "Super Admin",
            role: "Super Admin",
            statusName: "Active",
            isDemo: true,
            lastLogin: new Date().toLocaleString(),
        };

        localStorage.setItem("accessToken", demoUser.staffId);
        localStorage.setItem("user", JSON.stringify(demoUser));
        sessionStorage.setItem("userSession", JSON.stringify({ success: true, data: demoUser, isDemo: true }));

        setUser(demoUser);
        return {
            success: true,
            message: "Signed in as Demo Admin",
            data: demoUser,
        };
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        sessionStorage.removeItem("userSession");
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        loginAsDemo,
        signUp,
        forgotPassword,
        resetPassword,
        switchRole,
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
