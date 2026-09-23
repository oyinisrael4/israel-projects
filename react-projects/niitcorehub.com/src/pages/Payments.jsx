import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import StatusBadge from "../components/StatusBadge";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";
import niitLogo from "../assets/icon-images/niit-logo.png";

const STUDENT_DATABASE = {
    AD33578: { name: "Arlene McCoy", programme: "Web Development", avatar: student1, email: "arlene.mccoy@example.com" },
    AD45231: { name: "Wade Warren", programme: "Data Analysis", avatar: student2, email: "wade.warren@example.com" },
    AD67452: { name: "Brooklyn Simmons", programme: "Cybersecurity", avatar: student3, email: "brooklyn.simmons@example.com" },
    AD76133: { name: "Theresa Webb", programme: "Software Engineering", avatar: student4, email: "theresa.webb@example.com" },
    AD98214: { name: "Darlene Robertson", programme: "Networking", avatar: student5, email: "darlene.robertson@example.com" },
};

const INITIAL_PAYMENTS = [
    { sn: 1, img: student1, name: "Arlene McCoy", sid: "AD33578", programme: "Web Development", status: "Paid", amount: "₦150,000", search: "arlene mccoy ad33578 web development paid" },
    { sn: 2, img: student2, name: "Wade Warren", sid: "AD45231", programme: "Data Analysis", status: "Pending", amount: "₦150,000", search: "wade warren ad45231 data analysis pending" },
    { sn: 3, img: student3, name: "Brooklyn Simmons", sid: "AD67452", programme: "Cybersecurity", status: "Paid", amount: "₦150,000", search: "brooklyn simmons ad67452 cybersecurity paid" },
    { sn: 4, img: student4, name: "Theresa Webb", sid: "AD76133", programme: "Software Engineering", status: "Overdue", amount: "₦150,000", search: "theresa webb ad76133 software engineering overdue" },
    { sn: 5, img: student5, name: "Darlene Robertson", sid: "AD98214", programme: "Networking", status: "Pending", amount: "₦150,000", search: "darlene robertson ad98214 networking pending" },
];

export default function Payments() {
    const [payments, setPayments] = useState(INITIAL_PAYMENTS);
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Add Payment Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [studentIdInput, setStudentIdInput] = useState("");
    const [fetchedStudent, setFetchedStudent] = useState(null);
    const [fetchError, setFetchError] = useState("");

    // Receipt Modal State
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    // Toast state
    const [showToast, setShowToast] = useState(false);

    // Filtered Payments
    const filteredPayments = useMemo(() => {
        return payments.filter((p) => {
            const matchesStatus = statusFilter === "all" || p.status === statusFilter;
            const query = searchValue.trim().toLowerCase();
            const matchesSearch = !query || p.search.includes(query);
            return matchesStatus && matchesSearch;
        });
    }, [payments, statusFilter, searchValue]);

    // Handle Fetch Student
    function handleFetchStudent() {
        const id = studentIdInput.trim().toUpperCase();
        if (!id) return;

        const student = STUDENT_DATABASE[id];
        if (student) {
            const alreadyExists = payments.some((p) => p.sid.toUpperCase() === id);
            if (alreadyExists) {
                setFetchError("This student already has a payment entry.");
                setFetchedStudent(null);
                return;
            }
            setFetchedStudent({ id, ...student });
            setFetchError("");
        } else {
            setFetchError("Student ID not found. Please check and try again.");
            setFetchedStudent(null);
        }
    }

    // Handle Add Payment Submit
    function handleAddPaymentSubmit(e) {
        e.preventDefault();
        if (!fetchedStudent) return;

        const newPayment = {
            sn: payments.length + 1,
            img: fetchedStudent.avatar,
            name: fetchedStudent.name,
            sid: fetchedStudent.id,
            programme: fetchedStudent.programme,
            status: "Pending",
            amount: "₦150,000",
            search: `${fetchedStudent.name} ${fetchedStudent.id} ${fetchedStudent.programme} pending`.toLowerCase(),
        };

        setPayments((prev) => [...prev, newPayment]);
        setIsAddModalOpen(false);
        setStudentIdInput("");
        setFetchedStudent(null);
        setFetchError("");
    }

    // Copy link helper
    function handleCopyLink(e, sid) {
        e.preventDefault();
        const url = `${window.location.origin}/payment-link?id=${sid}`;
        navigator.clipboard.writeText(url).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }).catch(() => {
            navigator.clipboard.writeText(`pay.niit.edu/${sid}`).then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            });
        });
    }

    // Open receipt modal
    function openReceipt(payment) {
        setReceiptData(payment);
        setIsReceiptModalOpen(true);
    }

    return (
        <div className="app-layout-container">
            <Sidebar activePage="payments" />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Payments Here..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-cash-coin"
                            tag="Payments"
                            description="Track student payments, generate payment links, and manage tuition records."
                        />

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Payments</h3>
                                        <p className="roster-count-text">
                                            {filteredPayments.length} payment{filteredPayments.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-toggle2-on"></i>
                                            <select
                                                className="roster-filter-select"
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option value="all">All Status</option>
                                                <option value="Paid">Paid</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Overdue">Overdue</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <button
                                            type="button"
                                            className="panel-add-btn"
                                            onClick={() => {
                                                setStudentIdInput("");
                                                setFetchedStudent(null);
                                                setFetchError("");
                                                setIsAddModalOpen(true);
                                            }}
                                        >
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
                                        <tbody>
                                            {filteredPayments.map((p) => (
                                                <tr key={p.sid}>
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
                                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                            <Link
                                                                to={`/payment-link?id=${p.sid}`}
                                                                className="payment-link-cell"
                                                                title="Open payment link"
                                                            >
                                                                <span>pay.niit.edu/{p.sid}</span>
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => handleCopyLink(e, p.sid)}
                                                                title="Copy link"
                                                                style={{
                                                                    background: "none",
                                                                    border: "none",
                                                                    cursor: "pointer",
                                                                    color: "var(--primary-color, #1a73e8)",
                                                                    padding: "2px",
                                                                    display: "inline-flex",
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                <i className="bi bi-link-45deg" style={{ fontSize: "1.1rem" }}></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td><StatusBadge status={p.status} /></td>
                                                    <td>
                                                        <button
                                                            className="table-view-btn"
                                                            type="button"
                                                            onClick={() => openReceipt(p)}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredPayments.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted, #888)" }}>
                                                        No payments found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Add Payment Modal */}
            <div
                className={`payment-modal-overlay${isAddModalOpen ? " payment-modal-visible" : ""}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsAddModalOpen(false);
                }}
            >
                <div className="payment-modal">
                    <div className="payment-modal-header">
                        <div className="payment-modal-header-title">
                            <div className="payment-modal-header-icon"><i className="bi bi-cash-coin"></i></div>
                            <h2>Add Payment</h2>
                        </div>
                        <button
                            className="payment-modal-close-btn"
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="payment-modal-body">
                        <p className="payment-modal-intro">
                            Enter a valid Student ID below. The student&apos;s details will be fetched automatically and a unique
                            payment link will be generated.
                        </p>
                        <form onSubmit={handleAddPaymentSubmit}>
                            <div className="payment-modal-field">
                                <label htmlFor="studentIdInput">Student ID: *</label>
                                <div className="payment-modal-input-row">
                                    <input
                                        type="text"
                                        id="studentIdInput"
                                        placeholder="e.g. AD33578"
                                        value={studentIdInput}
                                        onChange={(e) => setStudentIdInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleFetchStudent();
                                            }
                                        }}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="payment-modal-fetch-btn"
                                        onClick={handleFetchStudent}
                                    >
                                        <i className="bi bi-search"></i>
                                        <span>Fetch</span>
                                    </button>
                                </div>
                            </div>

                            {/* Student preview card */}
                            {fetchedStudent && (
                                <div className="payment-modal-preview" style={{ display: "flex" }}>
                                    <div className="payment-modal-preview-row">
                                        <span className="payment-modal-preview-label">Name:</span>
                                        <span className="payment-modal-preview-value">{fetchedStudent.name}</span>
                                    </div>
                                    <div className="payment-modal-preview-row">
                                        <span className="payment-modal-preview-label">Programme:</span>
                                        <span className="payment-modal-preview-value">{fetchedStudent.programme}</span>
                                    </div>
                                    <div className="payment-modal-preview-row">
                                        <span className="payment-modal-preview-label">Payment Link:</span>
                                        <span className="payment-modal-preview-value payment-link-accent">
                                            pay.niit.edu/{fetchedStudent.id}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Error message */}
                            {fetchError && (
                                <div className="payment-modal-error" style={{ display: "flex" }}>
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                    <span>{fetchError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="payment-modal-submit-btn"
                                disabled={!fetchedStudent}
                            >
                                <i className="bi bi-check-lg"></i>
                                <span>Add Payment</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copied toast */}
            <div className={`payment-copied-toast${showToast ? " payment-copied-toast-visible" : ""}`}>
                <i className="bi bi-check-circle-fill"></i>
                <span>Payment link copied!</span>
            </div>

            {/* Official Payment Receipt Modal */}
            <div
                className={`inpage-modal-overlay${isReceiptModalOpen ? " inpage-modal-visible" : ""}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsReceiptModalOpen(false);
                }}
            >
                <div className="inpage-modal receipt-modal-wrapper">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon">
                                <i className="bi bi-receipt-cutoff"></i>
                            </div>
                            <h2>Official Payment Receipt</h2>
                        </div>
                        <button
                            className="inpage-modal-close-btn"
                            type="button"
                            onClick={() => setIsReceiptModalOpen(false)}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body">
                        {receiptData && (
                            <div className="receipt-card">
                                <div className="receipt-card-header">
                                    <div className="receipt-logo-block">
                                        <img src={niitLogo} alt="NIIT Logo" />
                                        <p>NIIT Institute of Information Technology</p>
                                    </div>
                                    <div className="receipt-meta-block">
                                        <span className="receipt-tag">{receiptData.status}</span>
                                        <div className="receipt-number">NIIT-REC-{receiptData.sid.replace(/\D/g, "")}</div>
                                        <div className="receipt-date">Sep 7, 2026</div>
                                    </div>
                                </div>

                                <div className="receipt-student-details">
                                    <div className="receipt-student-item">
                                        <span>Student Name</span>
                                        <span>{receiptData.name}</span>
                                    </div>
                                    <div className="receipt-student-item">
                                        <span>Student ID</span>
                                        <span>{receiptData.sid}</span>
                                    </div>
                                    <div className="receipt-student-item">
                                        <span>Programme</span>
                                        <span>{receiptData.programme}</span>
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
                                    <span className="receipt-total-value">{receiptData.amount || "₦150,000"}</span>
                                </div>

                                <div className="receipt-paid-stamp">
                                    <i className="bi bi-patch-check-fill"></i>
                                    <span>OFFICIALLY VERIFIED &amp; PAID</span>
                                </div>
                            </div>
                        )}

                        <div className="receipt-actions">
                            <button
                                type="button"
                                className="receipt-print-btn"
                                onClick={() => window.print()}
                            >
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
