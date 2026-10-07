import { useState } from "react";
import ParentSidebar from "./ParentSidebar";
import TopBar from "../../components/TopBar";
import PageFooter from "../../components/PageFooter";
import StatusBadge from "../../components/StatusBadge";
import RosterFilter from "../../components/RosterFilter";
import niitLogo from "../../assets/icon-images/niit-logo.png";
import profile1 from "../../assets/icon-images/profile-1.png";
import student1 from "../../assets/icon-images/student-1.png";
import student2 from "../../assets/icon-images/student-2.png";

const PARENT_NAV = [
    { id: "dashboard", to: "/parent-portal/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { id: "student", to: "/parent-portal/student", icon: "bi-people-fill", label: "Student" },
    { id: "payment", to: "/parent-portal/payment", icon: "bi-cash-coin", label: "Payment" },
    { id: "logout", to: "/login", icon: "bi-power", label: "Log-Out" },
];

const INITIAL_TRANSACTIONS = [
    {
        id: "txn-1",
        img: student1,
        studentName: "Arlene McCoy",
        sid: "AD33578",
        description: "Tuition & Coursework Materials",
        amount: "₦120,000",
        rawAmount: 120000,
        status: "Paid",
        date: "2026-09-07",
        time: "10:24 AM",
        ref: "NIIT-PAY-88219",
    },
    {
        id: "txn-2",
        img: student2,
        studentName: "Wade Warren",
        sid: "AD45231",
        description: "Tech Lab & Practical Resources",
        amount: "₦20,000",
        rawAmount: 20000,
        status: "Paid",
        date: "2026-09-10",
        time: "02:15 PM",
        ref: "NIIT-PAY-72341",
    },
    {
        id: "txn-3",
        img: student1,
        studentName: "Arlene McCoy",
        sid: "AD33578",
        description: "Portal Access & Exam Fee",
        amount: "₦10,000",
        rawAmount: 10000,
        status: "Pending",
        date: "2026-09-15",
        time: "09:00 AM",
        ref: "NIIT-PAY-55892",
    },
];

export default function ParentPayment() {
    const [transactions] = useState(INITIAL_TRANSACTIONS);
    const [searchValue, setSearchValue] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");

    // Receipt modal
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    function openReceipt(txn) {
        setReceiptData(txn);
        setIsReceiptOpen(true);
    }

    const filtered = transactions.filter((t) => {
        const matchStatus = statusFilter === "all" || t.status === statusFilter;
        const q = searchValue.trim().toLowerCase();
        const matchSearch = !q || t.studentName.toLowerCase().includes(q) || t.sid.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    return (
        <div className="app-layout-container">
            <ParentSidebar
                activePage="payment"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Payments..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={profile1}
                    profileName="Mrs. Adunola Ojo"
                    profileRole="Parent / Guardian"
                    navItems={PARENT_NAV}
                    activePage="payment"
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        {/* Top Portal Tag */}
                        <div className="parent-portal-top-bar">
                            <h2 className="parent-portal-brand-tag">PARENT/GUARDIAN PORTAL</h2>
                        </div>

                        <div className="parent-sub-heading">
                            <i className="bi bi-cash-coin"></i>
                            <span>Payment History</span>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <RosterFilter
                                    heading="Transaction History"
                                    countText={`${filtered.length} transaction${filtered.length !== 1 ? "s" : ""}`}
                                    filters={[
                                        {
                                            icon: "bi-toggle2-on",
                                            value: statusFilter,
                                            onChange: (e) => setStatusFilter(e.target.value),
                                            options: [
                                                { value: "all", label: "All Status" },
                                                { value: "Paid", label: "Paid" },
                                                { value: "Pending", label: "Pending" },
                                            ],
                                        },
                                    ]}
                                />

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="parentPaymentTable">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Student Name</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Date &amp; Time</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((t, i) => (
                                                <tr key={t.id}>
                                                    <td className="marks-table-admission-no">{i + 1}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={t.img} alt={t.studentName} />
                                                            <div>
                                                                <h4>{t.studentName}</h4>
                                                                <p>ID: {t.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="parent-payment-desc-cell">{t.description}</td>
                                                    <td className="parent-payment-amount-cell">{t.amount}</td>
                                                    <td className="parent-payment-date-cell">
                                                        <div>{t.date}</div>
                                                        <div className="parent-payment-time-sub">{t.time}</div>
                                                    </td>
                                                    <td><StatusBadge status={t.status} /></td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="table-view-btn"
                                                            onClick={() => openReceipt(t)}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="table-empty-cell">No transactions found.</td>
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

            {/* Receipt Modal */}
            <div
                className={`inpage-modal-overlay${isReceiptOpen ? " inpage-modal-visible" : ""}`}
                onClick={(e) => { if (e.target === e.currentTarget) setIsReceiptOpen(false); }}
            >
                <div className="inpage-modal receipt-modal-wrapper">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon"><i className="bi bi-receipt-cutoff"></i></div>
                            <h2>Official Payment Receipt</h2>
                        </div>
                        <button type="button" className="inpage-modal-close-btn" onClick={() => setIsReceiptOpen(false)}>
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
                                        <div className="receipt-number">{receiptData.ref}</div>
                                        <div className="receipt-date">{receiptData.date} at {receiptData.time}</div>
                                    </div>
                                </div>

                                <div className="receipt-student-details">
                                    <div className="receipt-student-item">
                                        <span>Student Name</span>
                                        <span>{receiptData.studentName}</span>
                                    </div>
                                    <div className="receipt-student-item">
                                        <span>Student ID</span>
                                        <span>{receiptData.sid}</span>
                                    </div>
                                    <div className="receipt-student-item">
                                        <span>Description</span>
                                        <span>{receiptData.description}</span>
                                    </div>
                                    <div className="receipt-student-item">
                                        <span>Payment Method</span>
                                        <span>Paystack (Online)</span>
                                    </div>
                                    <div className="receipt-student-item">
                                        <span>Reference</span>
                                        <span>{receiptData.ref}</span>
                                    </div>
                                </div>

                                <div className="receipt-total-row">
                                    <span className="receipt-total-label">Amount Paid</span>
                                    <span className="receipt-total-value">{receiptData.amount}</span>
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
                            <button
                                type="button"
                                className="receipt-print-btn receipt-download-btn"
                                onClick={() => window.print()}
                            >
                                <i className="bi bi-download"></i>
                                <span>Download PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
