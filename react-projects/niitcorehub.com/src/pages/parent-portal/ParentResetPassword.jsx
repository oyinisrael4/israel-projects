import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import niitLogo from "../../assets/icon-images/niit-logo.png";

export default function ParentResetPassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ otp: "", newPassword: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!form.otp || !form.newPassword || !form.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }
        if (form.newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setSuccess(true);
    }

    return (
        <div className="pp-auth-wrapper pp-auth-wrapper-centered">
            <div className="pp-auth-blob pp-auth-blob-1"></div>
            <div className="pp-auth-blob pp-auth-blob-2"></div>
            <div className="pp-auth-blob pp-auth-blob-3"></div>

            <div className="pp-auth-single-card">
                <div className="pp-auth-single-header">
                    <img src={niitLogo} alt="NIIT" className="pp-auth-single-logo" />
                    <div className="pp-auth-icon-badge pp-auth-icon-badge-green">
                        <i className="bi bi-key-fill"></i>
                    </div>
                    <h2>Reset Password</h2>
                    <p>Enter the OTP code sent to your email and create a new secure password.</p>
                </div>

                {!success ? (
                    <form className="pp-auth-form" onSubmit={handleSubmit}>
                        <div className="pp-auth-field">
                            <label htmlFor="rpOtp">OTP Code</label>
                            <div className="pp-auth-input-wrap">
                                <i className="bi bi-123"></i>
                                <input
                                    type="text"
                                    id="rpOtp"
                                    placeholder="Enter the OTP from your email"
                                    value={form.otp}
                                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pp-auth-field">
                            <label htmlFor="rpNewPassword">New Password</label>
                            <div className="pp-auth-input-wrap">
                                <i className="bi bi-lock-fill"></i>
                                <input
                                    type="password"
                                    id="rpNewPassword"
                                    placeholder="Create a new password"
                                    value={form.newPassword}
                                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        <div className="pp-auth-field">
                            <label htmlFor="rpConfirmPassword">Confirm Password</label>
                            <div className="pp-auth-input-wrap">
                                <i className="bi bi-lock-fill"></i>
                                <input
                                    type="password"
                                    id="rpConfirmPassword"
                                    placeholder="Confirm your new password"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="pp-auth-error-banner">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <button type="submit" className="pp-auth-submit-btn">
                            <span>Reset Password</span>
                            <i className="bi bi-check-circle-fill"></i>
                        </button>
                    </form>
                ) : (
                    <div className="pp-auth-success-box">
                        <div className="pp-auth-success-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <h3>Password Reset!</h3>
                        <p>Your password has been successfully reset. You can now log in with your new password.</p>
                        <button
                            type="button"
                            className="pp-auth-submit-btn"
                            onClick={() => navigate("/parent-portal/login")}
                        >
                            <span>Go to Login</span>
                            <i className="bi bi-arrow-right-circle-fill"></i>
                        </button>
                    </div>
                )}

                <div className="pp-auth-back-link">
                    <Link to="/parent-portal/forgot-password">
                        <i className="bi bi-arrow-left"></i>
                        Back to Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
}
