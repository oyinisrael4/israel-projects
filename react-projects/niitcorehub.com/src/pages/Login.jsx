import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import niitLogo from "../assets/icon-images/niit-logo.png";
import { signInHandle } from "../JS/auth";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            const handler = (e) => signInHandle(e, navigate);
            loginForm.addEventListener("submit", handler);
            return () => loginForm.removeEventListener("submit", handler);
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
                                <h1>Login</h1>
                                <p>New to NIIT? <Link to="/sign-up">Create your account</Link></p>
                            </div>

                            <form className="login-form" id="loginForm">
                                <div className="login-input-wrapper">
                                    <label htmlFor="username">Username or Email</label>
                                    <input type="text" id="username" placeholder="Enter your username or email" />
                                </div>

                                <div className="login-input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" placeholder="Enter your password" />
                                </div>

                                <div className="login-form-options">
                                    <label className="login-remember-wrapper">
                                        <input type="checkbox" id="rememberMe" />
                                        <span>Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" className="login-forgot-link">Forgot password?</Link>
                                </div>

                                <button type="submit" id="signInBtnId" className="btn login-submit-btn">Login</button>
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
        </>
    );
}
