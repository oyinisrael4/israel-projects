import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { forgotPasswordHandle } from "../JS/auth";

export default function ForgotPassword() {
    const navigate = useNavigate();

    useEffect(() => {
        const forgotForm = document.getElementById("forgotPasswordForm");
        if (forgotForm) {
            const handler = (e) => forgotPasswordHandle(e, navigate);
            forgotForm.addEventListener("submit", handler);
            return () => forgotForm.removeEventListener("submit", handler);
        }
    }, [navigate]);

    return (
        <>
            <div className="alert-overlay" id="alert"></div>

            <div className="login-page-wrapper">
                <div className="login-card">

                    <div className="login-form-panel">
                        <div className="login-form-inner">

                            <div className="login-logo-wrapper">
                                <img src={niitLogo} alt="NIIT" />
                            </div>

                            <div className="login-heading-wrapper">
                                <h1>Forgot Password</h1>
                                <p>New to NIIT? <Link to="/sign-up">Create your account</Link></p>
                            </div>

                            <form className="login-form" id="forgotPasswordForm">
                                <div className="login-input-wrapper">
                                    <label htmlFor="emailAddress">Email Address</label>
                                    <input type="email" id="emailAddress" placeholder="Enter your email" />
                                </div>
                                <button type="submit" id="submitBtnId" className="btn login-submit-btn">Proceed to Reset Password</button>
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
                            <h2>Forgot Password?</h2>
                            <p>Enter your email address and we&apos;ll send you a code to reset your password.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
