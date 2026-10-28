import { Link } from "react-router-dom";
import { useState } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { useAuth } from "../context/AuthContext";
import AlertModal from "../components/AlertModal";
import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import ErrorAlert from "../components/ErrorAlert";

export default function ResetPassword() {
    const getData = JSON.parse(sessionStorage.getItem("resetPasswordDataSession") || {});
    const { resetPassword } = useAuth();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [apiError, setApiError] = useState("");

    const [formData, setFormData] = useState({
        otpCode: "",
        newpassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        otpCode: "",
        newpassword: "",
        confirmPassword: "",
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
            otpCode: "",
            newpassword: "",
            confirmPassword: "",
        } ;

        if (!formData.otpCode.trim()) {
            newErrors.otpCode = "OTP code is required.";
        }

        if (!formData.newpassword) {
            newErrors.newpassword = "New password is required.";
        } else if (formData.newpassword.length < 8) {
            newErrors.newpassword = "Password must be at least 8 characters long.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required.";
        } else if (formData.newpassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setError(newErrors);

        return !Object.values(newErrors).some((msg) => msg !== "");
    };

    // Handle Reset Password submission
    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (loading) return;

        setSuccess("");
        setApiError("");

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const responseData = await resetPassword(
                getData?.data.staffId,
                formData.otpCode.trim(),
                formData.newpassword,
                formData.confirmPassword
            );

            if (responseData?.success === true) {
                setSuccess(
                    responseData?.message || "Password has been reset successfully."
                );
                setModal(true);
            } else {
                setApiError(
                    responseData?.message || "Unable to reset your password. Please check your details."
                );
            }
        } catch (err) {
            setApiError(
                err.response?.data?.message ||
                err.message ||
                "Unable to reset your password. Please try again."
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
                                <h1>Reset Password</h1>
                                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                            </div>

                            <div className="reset-otp-banner">
                                {getData?.data.otpCode} <br/>
                                An OTP has been sent to your email address <strong>{getData?.data.emailAddress}</strong>. Enter the OTP code and your new password below.
                            </div>

                            <form className="login-form" onSubmit={handleResetPassword}>
                               
                                <InputField
                                    title="OTP Code"
                                    id="otpCode"
                                    name="otpCode"
                                    inputType="text"
                                    placeHolder="Enter 6-digit OTP"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.otpCode}
                                    error={error.otpCode}
                                />

                                <InputField
                                    title="New Password"
                                    id="newpassword"
                                    name="newpassword"
                                    inputType="password"
                                    placeHolder="Enter new password (min. 8 characters)"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.newpassword}
                                    error={error.newpassword}
                                    autoComplete="new-password"
                                />

                                <InputField
                                    title="Confirm Password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    inputType="password"
                                    placeHolder="Confirm new password"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.confirmPassword}
                                    error={error.confirmPassword}
                                    autoComplete="new-password"
                                />

                                <ErrorAlert
                                    message={apiError}
                                    title="Password Reset Failed"
                                    onClose={() => setApiError("")}
                                />

                                <ButtonComponent
                                    buttonType="submit"
                                    buttonText={loading ? "Processing..." : "Reset Password"}
                                    buttonTitle="Reset Password"
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
                            <h2>Almost<br />There.</h2>
                            <p>Enter the OTP sent to your email address and your new password to reset your access.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Success Alert Modal redirecting to Sign In */}
            {modal && success && (
                <AlertModal
                    redirectLink="/login"
                    message={success}
                />
            )}
        </>
    );
}
