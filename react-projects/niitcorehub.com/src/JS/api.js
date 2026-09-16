const apiBaseUrl = "https://drakionoil.com/api/niit-api-testing";

/**
 * Generic API request function
 */
export async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            body: options.body ? JSON.stringify(options.body) : undefined
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

/**
 * SIGN UP
 */
export async function signup(fullName, emailAddress, phoneNumber, password) {
    return await apiRequest("auth/sign-up", {
        method: "POST",
        body: { fullName, emailAddress, phoneNumber, password }
    });
}

/**
 * LOGIN
 */
export async function loginApi(emailAddress, password) {
    return await apiRequest("auth/login", {
        method: "POST",
        body: { emailAddress, password }
    });
}

/**
 * REQUEST PASSWORD RESET
 */
export async function forgotPasswordApi(emailAddress) {
    return await apiRequest("auth/forgot-password", {
        method: "POST",
        body: { emailAddress }
    });
}

/**
 * RESET PASSWORD
 */
export async function resetPasswordApi(otpCode, password, confirmedPassword) {
    return await apiRequest("auth/reset-password", {
        method: "POST",
        body: { otpCode, password, confirmedPassword }
    });
}
