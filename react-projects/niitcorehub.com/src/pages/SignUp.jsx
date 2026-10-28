import { Link } from "react-router-dom";
import { useState } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import AlertModal from "../components/AlertModal";
import InputField from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import ErrorAlert from "../components/ErrorAlert";

export default function SignUp() {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [apiError, setApiError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        password: "",
    });

    const [error, setError] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        password: "",
    });

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

    const validateForm = () => {
        const newErrors = {
            fullName: "",
            emailAddress: "",
            phoneNumber: "",
            password: "",
        };

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        }

        if (!formData.emailAddress.trim()) {
            newErrors.emailAddress = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
            newErrors.emailAddress = "Enter a valid email address.";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setError(newErrors);
        return !Object.values(newErrors).some((msg) => msg !== "");
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (loading) return;

        setSuccess("");
        setApiError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        // Simulation since sign up API is excluded as per requirement
        setTimeout(() => {
            sessionStorage.setItem("userSignUpSession", JSON.stringify(formData));
            setSuccess("Registration Successful! Welcome to NIIT.");
            setModal(true);
            setLoading(false);
        }, 500);
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
                                <h1>Sign Up</h1>
                                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                            </div>

                            <form className="login-form" onSubmit={handleSignUp}>
                                <InputField
                                    title="Full Name"
                                    id="fullName"
                                    name="fullName"
                                    inputType="text"
                                    placeHolder="Enter your full name"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.fullName}
                                    error={error.fullName}
                                    autoComplete="name"
                                />

                                <InputField
                                    title="Email Address"
                                    id="emailAddress"
                                    name="emailAddress"
                                    inputType="email"
                                    placeHolder="Enter your email"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.emailAddress}
                                    error={error.emailAddress}
                                    autoComplete="email"
                                />

                                <InputField
                                    title="Phone Number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    inputType="tel"
                                    placeHolder="Enter your phone number"
                                    handleChangeValue={handleChange}
                                    inputValue={formData.phoneNumber}
                                    error={error.phoneNumber}
                                    autoComplete="tel"
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
                                    autoComplete="new-password"
                                />

                                <ErrorAlert
                                    message={apiError}
                                    title="Registration Notice"
                                    onClose={() => setApiError("")}
                                />

                                <ButtonComponent
                                    buttonType="submit"
                                    buttonText={loading ? "Creating Account..." : "Sign Up"}
                                    buttonTitle="Sign Up"
                                    btnAction={loading}
                                    className="login-submit-btn"
                                />
                            </form>

                            <div className="login-social-row">
                                <span>Or Sign Up with</span>
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
                            <h2>Join<br />NIIT.</h2>
                            <p>Create your account to manage students, teachers, attendance, and everything else happening at your school.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Alert Modal */}
            {modal && success && (
                <AlertModal
                    redirectLink="/login"
                    message={success}
                />
            )}
        </>
    );
}
