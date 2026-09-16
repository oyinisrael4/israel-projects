import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../assets/styles/paymentLink.css";
import niitLogo from "../assets/icon-images/niit-logo.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";

export default function PaymentLink() {
    const [searchParams] = useSearchParams();
    const rawId = searchParams.get("id") || "AD33578";
    const studentId = rawId.toUpperCase();

    const studentDatabase = {
        AD33578: { name: "Arlene McCoy", programme: "Web Development", avatar: student1, amount: "₦150,000", tuition: "₦120,000", lab: "₦20,000", exam: "₦10,000" },
        AD45231: { name: "Wade Warren", programme: "Data Analysis", avatar: student2, amount: "₦150,000", tuition: "₦120,000", lab: "₦20,000", exam: "₦10,000" },
        AD67452: { name: "Brooklyn Simmons", programme: "Cybersecurity", avatar: student3, amount: "₦150,000", tuition: "₦120,000", lab: "₦20,000", exam: "₦10,000" },
        AD76133: { name: "Theresa Webb", programme: "Software Engineering", avatar: student4, amount: "₦150,000", tuition: "₦120,000", lab: "₦20,000", exam: "₦10,000" },
        AD98214: { name: "Darlene Robertson", programme: "Networking", avatar: student5, amount: "₦150,000", tuition: "₦120,000", lab: "₦20,000", exam: "₦10,000" },
    };

    const student = studentDatabase[studentId] || {
        name: "Arlene McCoy",
        programme: "Web Development",
        avatar: student1,
        amount: "₦150,000",
        tuition: "₦120,000",
        lab: "₦20,000",
        exam: "₦10,000"
    };

    const [isPaystackOpen, setIsPaystackOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [txnRef, setTxnRef] = useState("NIIT-PAY-88219");

    const handleConfirmPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const randomRef = "NIIT-PAY-" + Math.floor(10000 + Math.random() * 90000);
            setTxnRef(randomRef);
            setIsProcessing(false);
            setIsPaid(true);
        }, 1200);
    };

    const handleCloseModal = () => {
        setIsPaystackOpen(false);
    };

    return (
        <div className="pay-page-body">
            {/* Header */}
            <header className="pay-header">
                <div className="pay-header-brand">
                    <img src={niitLogo} alt="NIIT EduManage" />
                </div>
                <div className="pay-header-badge">
                    <i className="bi bi-shield-check"></i>
                    <span>Verified Payment Portal</span>
                </div>
            </header>

            {/* Main Payment Container */}
            <main className="pay-container">
                <div className="pay-grid">

                    {/* Left: Student Info & Fee Breakdown */}
                    <div className="pay-card">
                        <h1 className="pay-card-title">Tuition &amp; Enrollment Payment</h1>
                        <p className="pay-card-subtitle">
                            Review student enrollment details and fee breakdown before proceeding to checkout.
                        </p>

                        {/* Student Profile Box */}
                        <div className="pay-student-profile">
                            <img src={student.avatar} alt="Student Avatar" id="checkoutAvatar" />
                            <div className="pay-student-info">
                                <h3 id="checkoutStudentName">{student.name}</h3>
                                <p id="checkoutStudentId">Student ID: {studentId}</p>
                                <span className="pill" id="checkoutProgramme">{student.programme}</span>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="pay-breakdown-list">
                            <div className="pay-breakdown-row">
                                <span>Tuition &amp; Coursework Materials</span>
                                <span>{student.tuition}</span>
                            </div>
                            <div className="pay-breakdown-row">
                                <span>Tech Lab &amp; Practical Resources</span>
                                <span>{student.lab}</span>
                            </div>
                            <div className="pay-breakdown-row">
                                <span>Portal Access &amp; Exam Fee</span>
                                <span>{student.exam}</span>
                            </div>
                        </div>

                        <div className="pay-total-card">
                            <div>
                                <p>Total Amount Due</p>
                                <h2 id="checkoutAmount">{student.amount}</h2>
                            </div>
                            <span
                                className={`status-badge ${isPaid ? "status-badge-active" : "status-badge-pending"}`}
                                id="checkoutStatusBadge"
                            >
                                {isPaid ? "Paid" : "Pending"}
                            </span>
                        </div>

                        <p style={{ fontFamily: "body-font", fontSize: "12px", color: "#777", margin: 0 }}>
                            <i className="bi bi-info-circle"></i> Once completed, a verified digital receipt will be generated instantly and updated in your student record.
                        </p>
                    </div>

                    {/* Right: Payment Method & Paystack CTA */}
                    <div className="pay-card">
                        <h2 className="pay-card-title" style={{ fontSize: "16px" }}>Payment Method</h2>
                        <p className="pay-card-subtitle">Fast, secure payment processed by Paystack.</p>

                        <div className="pay-provider-box">
                            <div className="pay-provider-left">
                                <div className="pay-provider-icon">
                                    <i className="bi bi-lightning-charge-fill"></i>
                                </div>
                                <div className="pay-provider-title">
                                    <h4>Pay with Paystack</h4>
                                    <p>Cards, Bank Transfer &amp; USSD</p>
                                </div>
                            </div>
                            <i className="bi bi-check-circle-fill" style={{ color: "var(--primary-color)", fontSize: "20px" }}></i>
                        </div>

                        <button
                            className="pay-checkout-btn"
                            type="button"
                            id="openPaystackBtn"
                            onClick={() => setIsPaystackOpen(true)}
                        >
                            <i className="bi bi-lock-fill"></i>
                            <span>Proceed to Pay {student.amount}</span>
                        </button>

                        <div className="pay-security-note">
                            <i className="bi bi-shield-lock-fill"></i>
                            <span>256-bit SSL Bank Grade Encryption</span>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "24px" }}>
                            <Link to="/payments" style={{ fontFamily: "sub-title-font", fontSize: "13px", color: "var(--primary-color)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <i className="bi bi-arrow-left"></i> Return to Payments Dashboard
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="pay-footer">
                <p>© 2026 NIIT EduManage. All Rights Reserved. Secure Payment Gateway powered by Paystack.</p>
            </footer>

            {/* Paystack Simulation Modal */}
            <div className={`paystack-modal-overlay ${isPaystackOpen ? "active" : ""}`} id="paystackModal">
                <div className="paystack-card">
                    <div className="paystack-header">
                        <div className="paystack-header-title">
                            <h3>NIIT EduManage Portal</h3>
                            <p>Pay {student.amount} to NIIT Nigeria</p>
                        </div>
                        <button
                            className="paystack-close-btn"
                            type="button"
                            id="paystackCloseBtn"
                            onClick={handleCloseModal}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="paystack-tabs">
                        <button
                            className={`paystack-tab-btn ${activeTab === "card" ? "active" : ""}`}
                            type="button"
                            onClick={() => setActiveTab("card")}
                        >
                            <i className="bi bi-credit-card"></i> Card
                        </button>
                        <button
                            className={`paystack-tab-btn ${activeTab === "transfer" ? "active" : ""}`}
                            type="button"
                            onClick={() => setActiveTab("transfer")}
                        >
                            <i className="bi bi-bank"></i> Transfer
                        </button>
                        <button
                            className={`paystack-tab-btn ${activeTab === "ussd" ? "active" : ""}`}
                            type="button"
                            onClick={() => setActiveTab("ussd")}
                        >
                            <i className="bi bi-phone"></i> USSD
                        </button>
                    </div>

                    {!isPaid ? (
                        <div className="paystack-body" id="paystackFormView">
                            {activeTab === "card" && (
                                <>
                                    <div className="paystack-field">
                                        <label>Card Number</label>
                                        <input type="text" defaultValue="5399 4100 2341 8921" readOnly />
                                    </div>
                                    <div className="paystack-row">
                                        <div className="paystack-field">
                                            <label>Valid Till</label>
                                            <input type="text" defaultValue="08 / 28" readOnly />
                                        </div>
                                        <div className="paystack-field">
                                            <label>CVV</label>
                                            <input type="password" defaultValue="894" readOnly />
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === "transfer" && (
                                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "14px" }}>
                                    <p style={{ fontSize: "11px", color: "#666", textTransform: "uppercase", marginBottom: "4px" }}>Bank Name</p>
                                    <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#1a1a1a" }}>Wema Bank / Paystack-Titan</h4>
                                    <p style={{ fontSize: "11px", color: "#666", textTransform: "uppercase", marginBottom: "4px" }}>Account Number</p>
                                    <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "var(--primary-color)", letterSpacing: "1px" }}>9920194821</h3>
                                    <span style={{ fontSize: "11px", color: "#888" }}>Expires in 30 minutes</span>
                                </div>
                            )}

                            {activeTab === "ussd" && (
                                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "14px", textAlign: "center" }}>
                                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>Dial this USSD code on your registered phone:</p>
                                    <h3 style={{ fontSize: "18px", color: "var(--primary-color)", letterSpacing: "1px", margin: "0 0 6px 0" }}>*737*50*150000*114#</h3>
                                    <span style={{ fontSize: "11px", color: "#888" }}>GTBank Instant USSD</span>
                                </div>
                            )}

                            <button
                                className="paystack-pay-btn"
                                type="button"
                                id="confirmPaystackPayBtn"
                                disabled={isProcessing}
                                onClick={handleConfirmPayment}
                            >
                                {isProcessing ? (
                                    <>
                                        <i className="bi bi-arrow-repeat spin"></i>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    `Pay ${student.amount}`
                                )}
                            </button>
                            <p style={{ textAlign: "center", fontFamily: "body-font", fontSize: "11px", color: "#888", marginTop: "10px", margin: 0 }}>
                                <i className="bi bi-shield-check"></i> Secured by Paystack
                            </p>
                        </div>
                    ) : (
                        /* Success State */
                        <div className="pay-success-state" id="paystackSuccessView">
                            <div className="pay-success-icon">
                                <i className="bi bi-check-lg"></i>
                            </div>
                            <h3 style={{ fontFamily: "title-font", fontSize: "18px", color: "var(--black-color)", marginBottom: "6px" }}>
                                Payment Successful!
                            </h3>
                            <p style={{ fontFamily: "body-font", fontSize: "13px", color: "#555", marginBottom: "16px" }}>
                                Your payment of <strong>{student.amount}</strong> has been confirmed. Ref: <span id="txnRef">{txnRef}</span>
                            </p>
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => window.print()}
                                    style={{ background: "var(--primary-color)", color: "#fff", borderRadius: "8px", padding: "10px 18px", fontSize: "13px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                                >
                                    <i className="bi bi-printer"></i> Print Receipt
                                </button>
                                <Link
                                    to="/payments"
                                    className="btn"
                                    style={{ background: "#2e7d32", color: "#fff", borderRadius: "8px", padding: "10px 18px", fontSize: "13px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                                >
                                    Back to Portal
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
