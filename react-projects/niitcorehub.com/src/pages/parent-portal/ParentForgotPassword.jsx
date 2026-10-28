import { useState } from "react";
import { Link } from "react-router-dom";
import niitLogo from "../../assets/icon-images/niit-logo.png";

export default function ParentForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <div className="pp-auth-wrapper pp-auth-wrapper-centered">
            <div className="pp-auth-blob pp-auth-blob-1"></div>
            <div className="pp-auth-blob pp-auth-blob-2"></div>
            <div className="pp-auth-blob pp-auth-blob-3"></div>

            <div className="pp-auth-single-card">
                <div className="pp-auth-single-header">
                    <img src={niitLogo} alt="NIIT" className="pp-auth-single-logo" />
                    <div className="pp-auth-icon-badge pp-auth-icon-badge-alt">
                        <i className="bi bi-shield-lock-fill"></i>
                    </div>
                    <h2>Forgot Password</h2>
                    <p>Enter the email address linked to your parent account and we'll send you a reset link.</p>
                </div>

                {!submitted ? (
                    <form className="pp-auth-form" onSubmit={handleSubmit}>
                        <div className="pp-auth-field">
                            <label htmlFor="fpEmail">Email Address</label>
                            <div className="pp-auth-input-wrap">
                                <i className="bi bi-envelope-fill"></i>
                                <input
                                    type="email"
                                    id="fpEmail"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <button type="submit" className="pp-auth-submit-btn">
                            <span>Send Reset Link</span>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>
                ) : (
                    <div className="pp-auth-success-box">
                        <div className="pp-auth-success-icon">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <h3>Check your inbox!</h3>
                        <p>A password reset link has been sent to <strong>{email}</strong>. Please check your inbox (and spam folder) for further instructions.</p>
                        <Link to="/parent-portal/reset-password" className="pp-auth-submit-btn pp-auth-submit-btn-outline">
                            <i className="bi bi-key-fill"></i>
                            <span>Enter Reset Code</span>
                        </Link>
                    </div>
                )}

                <div className="pp-auth-back-link">
                    <Link to="/parent-portal/login">
                        <i className="bi bi-arrow-left"></i>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
