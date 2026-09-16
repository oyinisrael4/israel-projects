import { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { init } from "../JS/payments";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";
import niitLogo from "../assets/icon-images/niit-logo.png";

const PAYMENTS = [
    { sn: 1, img: student1, name: "Arlene McCoy", sid: "AD33578", programme: "Web Development", status: "Paid", search: "arlene mccoy ad33578 web development paid" },
    { sn: 2, img: student2, name: "Wade Warren", sid: "AD45231", programme: "Data Analysis", status: "Pending", search: "wade warren ad45231 data analysis pending" },
    { sn: 3, img: student3, name: "Brooklyn Simmons", sid: "AD67452", programme: "Cybersecurity", status: "Paid", search: "brooklyn simmons ad67452 cybersecurity paid" },
    { sn: 4, img: student4, name: "Theresa Webb", sid: "AD76133", programme: "Software Engineering", status: "Overdue", search: "theresa webb ad76133 software engineering overdue" },
    { sn: 5, img: student5, name: "Darlene Robertson", sid: "AD98214", programme: "Networking", status: "Pending", search: "darlene robertson ad98214 networking pending" },
];

function statusClass(s) {
    if (s === "Paid") return "status-badge-active";
    if (s === "Pending") return "status-badge-pending";
    return "status-badge-inactive";
}

export default function Payments() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="payments" />

            <main className="main-content-wrapper">
                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" id="paymentSearchInput" placeholder="Search Payments Here..." />
                    </div>
                    <div className="topbar-actions-wrapper">
                        <button className="topbar-icon-btn" title="Theme"><i className="bi bi-sun-fill"></i></button>
                        <button className="topbar-icon-btn" title="Language"><i className="bi bi-globe2"></i></button>
                        <button className="topbar-icon-btn topbar-notification-btn" title="Notifications">
                            <i className="bi bi-bell-fill"></i>
                            <span className="topbar-notification-dot"></span>
                        </button>
                    </div>
                </header>

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <div className="page-heading-wrapper">
                            <div className="page-heading-tag">
                                <i className="bi bi-cash-coin"></i>
                                <span>Payments</span>
                            </div>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Track student payments, generate payment links, and manage tuition records.
                            </p>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Payments</h3>
                                        <p className="roster-count-text" id="paymentCount">5 payments</p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-toggle2-on"></i>
                                            <select className="roster-filter-select" id="statusFilter">
                                                <option value="all">All Status</option>
                                                <option value="Paid">Paid</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <button type="button" id="addPaymentBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Add Payment</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="paymentTable">
                                        <thead>
                                            <tr>
                                                <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Programme <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Payment Link <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Status <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="paymentTableBody">
                                            {PAYMENTS.map((p) => (
                                                <tr key={p.sn} data-status={p.status} data-search={p.search}>
                                                    <td className="marks-table-admission-no">{p.sn}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={p.img} alt={p.name} />
                                                            <div>
                                                                <h4>{p.name}</h4>
                                                                <p>Student ID: {p.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{p.programme}</td>
                                                    <td>
                                                        <Link to={`/payment-link?id=${p.sid}`} className="payment-link-cell" title="Open payment link">
                                                            <i className="bi bi-link-45deg"></i>
                                                            <span>pay.niit.edu/{p.sid}</span>
                                                        </Link>
                                                    </td>
                                                    <td><span className={`status-badge ${statusClass(p.status)}`}>{p.status}</span></td>
                                                    <td><button className="table-view-btn" type="button">View</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <footer className="dashboard-footer-wrapper">
                            <p>© 2026 Made With <i className="bi bi-heart-fill"></i> by NIIT.</p>
                        </footer>
                    </div>
                </div>
            </main>

            {/* Add Payment Modal */}
            <div className="payment-modal-overlay" id="paymentModalOverlay">
                <div className="payment-modal">
                    <div className="payment-modal-header">
                        <div className="payment-modal-header-title">
                            <div className="payment-modal-header-icon"><i className="bi bi-cash-coin"></i></div>
                            <h2>Add Payment</h2>
                        </div>
                        <button className="payment-modal-close-btn" id="paymentModalCloseBtn" type="button">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="payment-modal-body">
                        <p className="payment-modal-intro">
                            Enter a valid Student ID below. The student&apos;s details will be fetched automatically and a unique
                            payment link will be generated.
                        </p>
                        <form id="addPaymentForm">
                            <div className="payment-modal-field">
                                <label htmlFor="studentIdInput">Student ID: *</label>
                                <div className="payment-modal-input-row">
                                    <input type="text" id="studentIdInput" placeholder="e.g. AD33578" required />
                                    <button type="button" className="payment-modal-fetch-btn" id="fetchStudentBtn">
                                        <i className="bi bi-search"></i>
                                        <span>Fetch</span>
                                    </button>
                                </div>
                            </div>

                            {/* Student preview card (hidden by default) */}
                            <div className="payment-modal-preview" id="studentPreview" style={{ display: "none" }}>
                                <div className="payment-modal-preview-row">
                                    <span className="payment-modal-preview-label">Name:</span>
                                    <span className="payment-modal-preview-value" id="previewName">—</span>
                                </div>
                                <div className="payment-modal-preview-row">
                                    <span className="payment-modal-preview-label">Programme:</span>
                                    <span className="payment-modal-preview-value" id="previewProgramme">—</span>
                                </div>
                                <div className="payment-modal-preview-row">
                                    <span className="payment-modal-preview-label">Payment Link:</span>
                                    <span className="payment-modal-preview-value payment-link-accent" id="previewLink">—</span>
                                </div>
                            </div>

                            {/* Error message */}
                            <div className="payment-modal-error" id="studentError" style={{ display: "none" }}>
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                <span>Student ID not found. Please check and try again.</span>
                            </div>

                            <button type="submit" className="payment-modal-submit-btn" id="submitPaymentBtn" disabled>
                                <i className="bi bi-check-lg"></i>
                                <span>Add Payment</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copied toast */}
            <div className="payment-copied-toast" id="copiedToast">
                <i className="bi bi-check-circle-fill"></i>
                <span>Payment link copied!</span>
            </div>

            {/* Official Payment Receipt Modal with Blurred Backdrop */}
            <div className="inpage-modal-overlay" id="receiptModalOverlay">
                <div className="inpage-modal receipt-modal-wrapper">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon">
                                <i className="bi bi-receipt-cutoff"></i>
                            </div>
                            <h2>Official Payment Receipt</h2>
                        </div>
                        <button className="inpage-modal-close-btn" id="receiptModalCloseBtn" type="button">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body">
                        <div className="receipt-card">
                            <div className="receipt-card-header">
                                <div className="receipt-logo-block">
                                    <img src={niitLogo} alt="NIIT Logo" />
                                    <p>NIIT Institute of Information Technology</p>
                                </div>
                                <div className="receipt-meta-block">
                                    <span className="receipt-tag" id="receiptStatusTag">Paid</span>
                                    <div className="receipt-number" id="receiptNumber">NIIT-REC-33578</div>
                                    <div className="receipt-date" id="receiptDate">Sep 7, 2026</div>
                                </div>
                            </div>

                            <div className="receipt-student-details">
                                <div className="receipt-student-item">
                                    <span>Student Name</span>
                                    <span id="receiptStudentName">Arlene McCoy</span>
                                </div>
                                <div className="receipt-student-item">
                                    <span>Student ID</span>
                                    <span id="receiptStudentId">AD33578</span>
                                </div>
                                <div className="receipt-student-item">
                                    <span>Programme</span>
                                    <span id="receiptProgramme">Web Development</span>
                                </div>
                                <div className="receipt-student-item">
                                    <span>Payment Method</span>
                                    <span>Paystack (Online)</span>
                                </div>
                            </div>

                            <table className="receipt-breakdown-table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tuition &amp; Enrollment Fee</td>
                                        <td>₦120,000</td>
                                    </tr>
                                    <tr>
                                        <td>Tech Lab &amp; Practicals</td>
                                        <td>₦20,000</td>
                                    </tr>
                                    <tr>
                                        <td>Portal Access &amp; Examination Levy</td>
                                        <td>₦10,000</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="receipt-total-row">
                                <span className="receipt-total-label">Total Amount Paid</span>
                                <span className="receipt-total-value" id="receiptAmount">₦150,000</span>
                            </div>

                            <div className="receipt-paid-stamp" id="receiptPaidStamp">
                                <i className="bi bi-patch-check-fill"></i>
                                <span>OFFICIALLY VERIFIED &amp; PAID</span>
                            </div>
                        </div>

                        <div className="receipt-actions">
                            <button type="button" className="receipt-print-btn" id="printReceiptBtn">
                                <i className="bi bi-printer"></i>
                                <span>Print Receipt</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
