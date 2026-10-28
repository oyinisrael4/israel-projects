import { Link } from "react-router-dom";
import { useState } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { useAuth } from "../context/AuthContext";
import AlertModal from "../components/AlertModal";
import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import ErrorAlert from "../components/ErrorAlert";

export default function Login() {
    const { login } = useAuth();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [apiError, setApiError] = useState("");

    const [formData, setFormData] = useState({
        emailAddress: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState({
        emailAddress: "",
        password: "",
    });

    // Update input values
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear errors as user types
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
            password: "",
        };

        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
            newErrors.emailAddress = "Enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        }

        setError(newErrors);

        return !Object.values(newErrors).some((msg) => msg !== "");
    };

    // Handle Sign In submission
    const handleSignIn = async (event) => {
        event.preventDefault();
        if (loading) return;

        setSuccess("");
        setApiError("");

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            // Call API or AuthContext login
            const responseData = await login(formData.emailAddress.trim(), formData.password);

            if (responseData?.success === true) {
                setSuccess(
                    responseData?.message || "STAFF LOGIN SUCCESSFUL"
                );
                setModal(true);
            } else {
                setApiError(
                    responseData?.message || "Unable to sign in. Please try again."
                );
            }
        } catch (err) {
            setApiError(
                err.response?.data?.message ||
                err.message ||
                "Unable to sign in. Please try again."
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
                                <h1>Sign In</h1>
                                <p>New to NIIT? <Link to="/sign-up">Create your account</Link></p>
                            </div>

                            <form className="login-form" onSubmit={handleSignIn}>
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

                                <InputField
                                    title="Password"
                                    id="password"
                                    name="password"
                                    inputType="password"
                                    placeHolder="Enter your password"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.password}
                                    error={error.password}
                                    autoComplete="current-password"
                                />

                                <div className="login-form-options">
                                    <label className="login-remember-wrapper">
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                        />
                                        <span>Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" className="login-forgot-link">Forgot password?</Link>
                                </div>

                                <ErrorAlert
                                    message={apiError}
                                    title="Sign In Failed"
                                    onClose={() => setApiError("")}
                                />

                                <ButtonComponent
                                    buttonType="submit"
                                    buttonText={loading ? "Processing..." : "Sign In"}
                                    buttonTitle="Sign In"
                                    btnAction={loading}
                                    className="login-submit-btn"
                                />
                            </form>

                            <div className="login-social-row">
                                <span>Or login with</span>
                                <div className="login-social-wrapper">
                                    <button type="button" className="login-social-btn login-social-btn-facebook" title="Login with Facebook">
                                        <i className="bi bi-facebook"></i>
                                    </button>
                                    <button type="button" className="login-social-btn login-social-btn-twitter" title="Login with Twitter">
                                        <i className="bi bi-twitter"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="login-portal-switch-card">
                                <div className="login-portal-switch-left">
                                    <div className="login-portal-switch-icon">
                                        <i className="bi bi-house-heart-fill"></i>
                                    </div>
                                    <div>
                                        <span className="login-portal-switch-badge">PORTAL ACCESS</span>
                                        <h4>Parent &amp; Guardian Portal</h4>
                                        <p>Track student performance &amp; manage payments</p>
                                    </div>
                                </div>
                                <Link
                                    to="/parent-portal/login"
                                    className="login-portal-switch-btn"
                                >
                                    <span>Access</span>
                                    <i className="bi bi-arrow-right-short"></i>
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div className="login-hero-panel">
                        <div className="login-hero-shape"></div>
                        <div className="login-hero-content">
                            <h2>Welcome<br />Back.</h2>
                            <p>Sign in to keep track of students, teachers, attendance, and everything else happening at your school today.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Success Alert Modal matching webtesting structure */}
            {modal && success && (
                <AlertModal
                    redirectLink="/dashboard"
                    message={success}
                />
            )}
        </>
    );
}
