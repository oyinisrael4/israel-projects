import { useState, useEffect } from "react";
import niitLogo from "../../assets/icon-images/niit-logo.png";
import student1 from "../../assets/icon-images/student-1.png";

const DEFAULT_FEES = [
    { id: "tuition", label: "Tuition & Coursework Materials", amount: 120000, defaultChecked: true },
    { id: "lab", label: "Tech Lab & Practical Resources", amount: 20000, defaultChecked: true },
    { id: "exam", label: "Portal Access & Exam Fee", amount: 10000, defaultChecked: true },
];

export default function PaymentModal({ isOpen, onClose, student }) {
    const [selectedFees, setSelectedFees] = useState({
        tuition: true,
        lab: true,
        exam: true,
    });
    const [isPaystackOpen, setIsPaystackOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [txnRef, setTxnRef] = useState("NIIT-PAY-88219");

    useEffect(() => {
        if (isOpen) {
            // reset to default full payment selection on open
            setSelectedFees({ tuition: true, lab: true, exam: true });
            setIsPaystackOpen(false);
            setIsPaid(false);
            setIsProcessing(false);
            setActiveTab("card");
        }
    }, [isOpen]);

    if (!isOpen || !student) return null;

    const totalAmount = DEFAULT_FEES.reduce(
        (sum, item) => (selectedFees[item.id] ? sum + item.amount : sum),
        0
    );
    const formattedTotal = "₦" + totalAmount.toLocaleString();
    const noneSelected = totalAmount === 0;

    const toggleFee = (id) => {
        setSelectedFees((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleConfirmPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const randomRef = "NIIT-PAY-" + Math.floor(10000 + Math.random() * 90000);
            setTxnRef(randomRef);
            setIsProcessing(false);
            setIsPaid(true);
        }, 1300);
    };

    const handleCloseAll = () => {
        setIsPaystackOpen(false);
        setIsPaid(false);
        onClose();
    };

    return (
        <div
            className={`pay-modal-overlay active`}
            onClick={(e) => {
                if (e.target === e.currentTarget && !isPaystackOpen) handleCloseAll();
            }}
        >
            <div className="pay-modal-dialog">
                {/* Modal Header */}
                <div className="pay-modal-header">
                    <div className="pay-modal-header-left">
                        <img src={niitLogo} alt="NIIT EduManage" />
                        <div className="pay-modal-badge">
                            <i className="bi bi-shield-check"></i>
                            <span>Verified Payment Portal</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="pay-modal-close-btn"
                        onClick={handleCloseAll}
                        title="Close"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Modal 2-Column Body (Identical to PaymentLink.jsx) */}
                <div className="pay-modal-body">
                    <div className="pay-grid">

                        {/* Left Card: Student Info & Selectable Fee Breakdown */}
                        <div className="pay-card">
                            <h1 className="pay-card-title">Tuition &amp; Enrollment Payment</h1>
                            <p className="pay-card-subtitle">
                                Review student enrollment details and fee breakdown before proceeding to checkout.
                            </p>

                            {/* Student Profile Box */}
                            <div className="pay-student-profile">
                                <img src={student.img || student1} alt={student.name} />
                                <div className="pay-student-info">
                                    <h3>{student.name}</h3>
                                    <p>Student ID: {student.sid}</p>
                                    <span className="pill">{student.programme}</span>
                                </div>
                            </div>

                            {/* Breakdown with Checkbox Selectors */}
                            <div className="pay-breakdown-list">
                                {DEFAULT_FEES.map((fee) => {
                                    const isChecked = !!selectedFees[fee.id];
                                    return (
                                        <div
                                            key={fee.id}
                                            className={`pay-fee-item ${isChecked ? "selected" : ""}`}
                                            onClick={() => toggleFee(fee.id)}
                                        >
                                            <div className="pay-fee-item-left">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => {}} // handled by parent div onClick
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <span>{fee.label}</span>
                                            </div>
                                            <span className="pay-fee-item-amount">
                                                ₦{fee.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Total Amount Due */}
                            <div className="pay-total-card">
                                <div>
                                    <p>Total Amount Due</p>
                                    <h2>{formattedTotal}</h2>
                                </div>
                                <span
                                    className={`status-badge ${isPaid ? "status-badge-active" : "status-badge-pending"}`}
                                >
                                    {isPaid ? "Paid" : "Pending"}
                                </span>
                            </div>

                            <p className="pay-info-subtext">
                                <i className="bi bi-info-circle"></i> Select the items you wish to pay for now. Once completed, a verified digital receipt will be generated instantly.
                            </p>
                        </div>

                        {/* Right Card: Payment Method & Paystack Checkout CTA */}
                        <div className="pay-card">
                            <h2 className="pay-card-title pay-method-title">Payment Method</h2>
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
                                <i className="bi bi-check-circle-fill pay-method-check-icon"></i>
                            </div>

                            <button
                                className={`pay-checkout-btn ${noneSelected ? "pay-checkout-disabled" : "pay-checkout-active"}`}
                                type="button"
                                disabled={noneSelected}
                                onClick={() => setIsPaystackOpen(true)}
                            >
                                <i className="bi bi-lock-fill"></i>
                                <span>{noneSelected ? "Select at least 1 item" : `Proceed to Pay ${formattedTotal}`}</span>
                            </button>

                            <div className="pay-security-note">
                                <i className="bi bi-shield-lock-fill"></i>
                                <span>256-bit SSL Bank Grade Encryption</span>
                            </div>

                            <div className="pay-modal-return-wrap">
                                <button
                                    type="button"
                                    onClick={handleCloseAll}
                                    className="pay-return-btn"
                                >
                                    <i className="bi bi-arrow-left"></i> Return to Portal
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Simulated Paystack Gateway Modal Overlay inside Modal */}
                {isPaystackOpen && (
                    <div className="paystack-modal-overlay active paystack-overlay-elevated">
                        <div className="paystack-card">
                            <div className="paystack-header">
                                <div className="paystack-header-title">
                                    <h3>NIIT EduManage Portal</h3>
                                    <p>Pay {formattedTotal} to NIIT Nigeria</p>
                                </div>
                                <button
                                    className="paystack-close-btn"
                                    type="button"
                                    onClick={() => setIsPaystackOpen(false)}
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
                                <div className="paystack-body">
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
                                        <div className="pay-transfer-box">
                                            <p className="pay-transfer-label">Bank Name</p>
                                            <h4 className="pay-transfer-bank">Wema Bank / Paystack-Titan</h4>
                                            <p className="pay-transfer-label">Account Number</p>
                                            <h3 className="pay-transfer-acc">9920194821</h3>
                                            <span className="pay-transfer-expire">Expires in 30 minutes</span>
                                        </div>
                                    )}

                                    {activeTab === "ussd" && (
                                        <div className="pay-ussd-box">
                                            <p className="pay-ussd-label">Dial this USSD code on your registered phone:</p>
                                            <h3 className="pay-ussd-code">*737*50*{totalAmount}*114#</h3>
                                            <span className="pay-ussd-type">GTBank Instant USSD</span>
                                        </div>
                                    )}

                                    <button
                                        className="paystack-pay-btn"
                                        type="button"
                                        disabled={isProcessing}
                                        onClick={handleConfirmPayment}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <i className="bi bi-arrow-repeat spin"></i>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            `Pay ${formattedTotal}`
                                        )}
                                    </button>
                                    <p className="pay-secured-text">
                                        <i className="bi bi-shield-check"></i> Secured by Paystack
                                    </p>
                                </div>
                            ) : (
                                /* Success State */
                                <div className="pay-success-state">
                                    <div className="pay-success-icon">
                                        <i className="bi bi-check-lg"></i>
                                    </div>
                                    <h3 className="pay-success-title">
                                        Payment Successful!
                                    </h3>
                                    <p className="pay-success-desc">
                                        Your payment of <strong>{formattedTotal}</strong> has been confirmed. Ref: <span className="payment-link-accent">{txnRef}</span>
                                    </p>
                                    <div className="pay-modal-btn-row">
                                        <button
                                            type="button"
                                            onClick={() => window.print()}
                                            className="pay-print-btn"
                                        >
                                            <i className="bi bi-printer"></i> Print Receipt
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseAll}
                                            className="pay-done-btn"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
