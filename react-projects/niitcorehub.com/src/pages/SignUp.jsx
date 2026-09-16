import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { signUpHandle } from "../JS/auth";

export default function SignUp() {
    const navigate = useNavigate();

    useEffect(() => {
        const signupForm = document.getElementById("signupForm");
        if (signupForm) {
            const handler = (e) => signUpHandle(e, navigate);
            signupForm.addEventListener("submit", handler);
            return () => signupForm.removeEventListener("submit", handler);
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
                                <h1>Sign Up</h1>
                                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                            </div>

                            <form className="login-form" id="signupForm">
                                <div className="login-input-wrapper">
                                    <label htmlFor="fullName">Fullname</label>
                                    <input type="text" id="fullName" placeholder="Enter your fullname" />
                                </div>

                                <div className="login-input-wrapper">
                                    <label htmlFor="emailAddress">Email Address</label>
                                    <input type="email" id="emailAddress" placeholder="Enter your email" />
                                </div>

                                <div className="login-input-wrapper">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="tel" id="phoneNumber" placeholder="Enter your phone number" />
                                </div>

                                <div className="login-input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" />
                                </div>

                                <button type="submit" id="submitBtnId" className="btn login-submit-btn">Sign Up</button>
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
        </>
    );
}
