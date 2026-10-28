import { Link } from "react-router-dom";
import { useState } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import ErrorAlert from "../components/ErrorAlert";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const [formData, setFormData] = useState({
        emailAddress: "",
    });

    const [error, setError] = useState({
        emailAddress: "",
    });

    // Update input values
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));

        setApiError("");
    };

    // Validate fields
    const validateForm = () => {
        const newErrors = {
            emailAddress: "",
        };

        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
            newErrors.emailAddress = "Enter a valid email address.";
        }

        setError(newErrors);

        return !Object.values(newErrors).some((msg) => msg !== "");
    };

    // Handle Forgot Password submission
    const handleForgotPassword = async (event) => {
        event.preventDefault();
        if (loading) return;

        setApiError("");

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const responseData = await forgotPassword(formData.emailAddress.trim());

            if (responseData?.success === true) {
                sessionStorage.setItem("resetPasswordDataSession", JSON.stringify(responseData));
                navigate("/reset-password");
            } else {
                setApiError(
                    responseData?.message || "Unable to process your request. Please try again."
                );
            }
        } catch (err) {
            setApiError(
                err.response?.data?.message ||
                err.message ||
                "Unable to process your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-page-wrapper">
                <div className="login-card">

                    <div className="login-form-panel">
                        <div className="login-form-inner">

                            <div className="login-logo-wrapper">
                                <img src={niitLogo} alt="NIIT" />
                            </div>

                            <div className="login-heading-wrapper">
                                <h1>Forgot Password</h1>
                                <p>Remember your password? <Link to="/login">Sign In</Link></p>
                            </div>

                            <form className="login-form" onSubmit={handleForgotPassword}>
                                <InputField
                                    title="Email Address"
                                    id="emailAddress"
                                    name="emailAddress"
                                    inputType="email"
                                    placeHolder="Enter your email address"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.emailAddress}
                                    error={error.emailAddress}
                                    autoComplete="email"
                                />

                                <ErrorAlert
                                    message={apiError}
                                    title="Request Failed"
                                    onClose={() => setApiError("")}
                                />

                                <ButtonComponent
                                    buttonType="submit"
                                    buttonText={loading ? "Processing..." : "Proceed to Reset Password"}
                                    buttonTitle="Proceed to Reset Password"
                                    btnAction={loading}
                                    className="login-submit-btn"
                                />
                            </form>

                            <div className="login-social-row">
                                <span>Or Sign In with</span>
                                <div className="login-social-wrapper">
                                    <button type="button" className="login-social-btn login-social-btn-facebook" title="Login with Facebook">
                                        <i className="bi bi-facebook"></i>
                                    </button>
                                    <button type="button" className="login-social-btn login-social-btn-twitter" title="Login with Twitter">
                                        <i className="bi bi-twitter"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="login-hero-panel">
                        <div className="login-hero-shape"></div>
                        <div className="login-hero-content">
                            <h2>Forgot Password?</h2>
                            <p>Enter your email address and we&apos;ll send you an OTP code to reset your password.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
