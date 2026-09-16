import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { resetPasswordHandle } from "../JS/auth";

export default function ResetPassword() {
    const navigate = useNavigate();

    useEffect(() => {
        const resetForm = document.getElementById("resetPasswordForm");
        if (resetForm) {
            const handler = (e) => resetPasswordHandle(e, navigate);
            resetForm.addEventListener("submit", handler);
            return () => resetForm.removeEventListener("submit", handler);
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
                                <h1>Reset Password</h1>
                                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                            </div>

                            <form className="login-form" id="resetPasswordForm">
                                <div className="login-input-wrapper">
                                    <label htmlFor="otp">OTP</label>
                                    <input type="text" id="otp" placeholder="Enter your OTP" />
                                </div>

                                <div className="login-input-wrapper">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" id="newPassword" placeholder="Enter your new password" />
                                </div>

                                <div className="login-input-wrapper">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                                </div>

                                <button type="submit" id="submitBtnId" className="btn login-submit-btn">Submit</button>
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
                            <h2>Almost<br />There.</h2>
                            <p>Enter the OTP sent to your phone number and your new password to reset your password.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
