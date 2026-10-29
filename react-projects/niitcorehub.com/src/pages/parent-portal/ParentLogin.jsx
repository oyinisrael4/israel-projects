import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import niitLogo from "../../assets/icon-images/niit-logo.png";

export default function ParentLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    function handleSubmit(e) {
        e.preventDefault();
        const parentSession = {
            email: form.email || "adunola.ojo@gmail.com",
            name: "Mrs. Adunola Ojo",
            loggedIn: true,
            loginTime: new Date().toISOString(),
        };
        localStorage.setItem("parentSession", JSON.stringify(parentSession));
        navigate("/parent-portal/dashboard");
    }

    return (
        <div className="pp-auth-wrapper">
            {/* Animated background blobs */}
            <div className="pp-auth-blob pp-auth-blob-1"></div>
            <div className="pp-auth-blob pp-auth-blob-2"></div>
            <div className="pp-auth-blob pp-auth-blob-3"></div>

            <div className="pp-auth-card">
                {/* Left hero panel */}
                <div className="pp-auth-hero">
                    <div className="pp-auth-hero-content">
                        <div className="pp-auth-logo-row">
                            <img src={niitLogo} alt="NIIT" />
                        </div>
                        <h1>Parent &amp;<br />Guardian Portal</h1>
                        <p>Stay connected with your child's academic journey. Track progress, manage payments, and more — all in one place.</p>
                        <div className="pp-auth-features">
                            <div className="pp-auth-feature-item">
                                <i className="bi bi-people-fill"></i>
                                <span>Track your children's progress</span>
                            </div>
                            <div className="pp-auth-feature-item">
                                <i className="bi bi-cash-coin"></i>
                                <span>Manage fee payments seamlessly</span>
                            </div>
                            <div className="pp-auth-feature-item">
                                <i className="bi bi-shield-check-fill"></i>
                                <span>Secure and private access</span>
                            </div>
                        </div>
                    </div>
                    <div className="pp-auth-hero-shapes">
                        <div className="pp-hero-shape-circle pp-hero-shape-c1"></div>
                        <div className="pp-hero-shape-circle pp-hero-shape-c2"></div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="pp-auth-form-panel">
                    <div className="pp-auth-form-inner">
                        <div className="pp-auth-form-header">
                            <div className="pp-auth-icon-badge">
                                <i className="bi bi-house-heart-fill"></i>
                            </div>
                            <h2>Welcome Back</h2>
                            <p>Sign in to access your parent dashboard</p>
                        </div>

                        <form className="pp-auth-form" onSubmit={handleSubmit}>
                            <div className="pp-auth-field">
                                <label htmlFor="ppEmail">Email Address</label>
                                <div className="pp-auth-input-wrap">
                                    <i className="bi bi-envelope-fill"></i>
                                    <input
                                        type="email"
                                        id="ppEmail"
                                        placeholder="Enter your email address"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="pp-auth-field">
                                <label htmlFor="ppPassword">Password</label>
                                <div className="pp-auth-input-wrap">
                                    <i className="bi bi-lock-fill"></i>
                                    <input
                                        type="password"
                                        id="ppPassword"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            <div className="pp-auth-options">
                                <label className="pp-auth-remember">
                                    <input type="checkbox" id="ppRemember" />
                                    <span>Remember me</span>
                                </label>
                                <Link to="/parent-portal/forgot-password" className="pp-auth-forgot-link">Forgot password?</Link>
                            </div>

                            <button type="submit" className="pp-auth-submit-btn">
                                <span>Sign In</span>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                            </button>
                        </form>

                        <div className="pp-auth-divider">
                            <span>New parent?</span>
                        </div>

                        <div className="pp-auth-new-parent">
                            <p>Your counselor will create your account and share the portal link with you. You can then reset your password using your email to get started.</p>
                        </div>

                        <div className="pp-auth-back-link">
                            <Link to="/login">
                                <i className="bi bi-arrow-left"></i>
                                Back to Staff Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
