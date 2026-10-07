import { useState } from "react";
import ParentSidebar from "./ParentSidebar";
import TopBar from "../../components/TopBar";
import PageFooter from "../../components/PageFooter";
import StatusBadge from "../../components/StatusBadge";
import PaymentModal from "./PaymentModal";
import student1 from "../../assets/icon-images/student-1.png";
import student2 from "../../assets/icon-images/student-2.png";
import profile1 from "../../assets/icon-images/profile-1.png";

const PARENT_PROFILE = {
    username: "adunola_ojo",
    name: "Mrs. Adunola Ojo",
    relationship: "Mother",
    email: "adunola.ojo@gmail.com",
    phone: "080 7654 3210",
    lastLogin: "2026-09-29 08:45 AM",
    avatar: profile1,
};

const LINKED_STUDENTS = [
    { sn: 1, img: student1, name: "Arlene McCoy", sid: "AD33578", programme: "Web Development", status: "Active" },
    { sn: 2, img: student2, name: "Wade Warren", sid: "AD45231", programme: "Data Analysis", status: "Active" },
];

const PARENT_NAV = [
    { id: "dashboard", to: "/parent-portal/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { id: "student", to: "/parent-portal/student", icon: "bi-people-fill", label: "Student" },
    { id: "payment", to: "/parent-portal/payment", icon: "bi-cash-coin", label: "Payment" },
    { id: "logout", to: "/login", icon: "bi-power", label: "Log-Out" },
];

export default function ParentDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "profile"
    const [searchValue, setSearchValue] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [paymentStudent, setPaymentStudent] = useState(null);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    function openPayment(student) {
        setPaymentStudent(student);
        setIsPayModalOpen(true);
    }

    const filteredStudents = LINKED_STUDENTS.filter((s) => {
        const q = searchValue.trim().toLowerCase();
        return (
            !q ||
            s.name.toLowerCase().includes(q) ||
            s.sid.toLowerCase().includes(q) ||
            s.programme.toLowerCase().includes(q)
        );
    });

    return (
        <div className="app-layout-container">
            <ParentSidebar
                activePage="dashboard"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search in portal..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={PARENT_PROFILE.avatar}
                    profileName={PARENT_PROFILE.name}
                    profileRole="Parent / Guardian"
                    navItems={PARENT_NAV}
                    activePage="dashboard"
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        {/* Top Portal Bar with Tabs (Matches Reference Image) */}
                        <div className="parent-portal-top-bar">
                            <h2 className="parent-portal-brand-tag">PARENT/GUARDIAN PORTAL</h2>
                            <div className="parent-portal-tabs">
                                <button
                                    type="button"
                                    className={`parent-portal-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
                                    onClick={() => setActiveTab("dashboard")}
                                >
                                    <i className="bi bi-speedometer2"></i>
                                    <span>Dashboard</span>
                                </button>
                                <button
                                    type="button"
                                    className={`parent-portal-tab-btn ${activeTab === "profile" ? "active" : ""}`}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <i className="bi bi-person-fill"></i>
                                    <span>My Profile</span>
                                </button>
                            </div>
                        </div>

                        {/* =========================================================
                            TAB 1: DASHBOARD VIEW
                            ========================================================= */}
                        {activeTab === "dashboard" && (
                            <>
                                <div className="parent-sub-heading">
                                    <i className="bi bi-speedometer2"></i>
                                    <span>Dashboard</span>
                                </div>

                                {/* Summary Overview Bar (Matches Reference Image) */}
                                <div className="parent-summary-card">
                                    <div className="parent-summary-inner">
                                        <div className="parent-summary-left">
                                            <div className="parent-avatar-circle">
                                                <img src={PARENT_PROFILE.avatar} alt={PARENT_PROFILE.name} />
                                            </div>
                                            <div className="parent-summary-meta">
                                                <h3>{PARENT_PROFILE.name}</h3>
                                                <p>
                                                    <i className="bi bi-people-fill"></i>
                                                    Relationship: <b>{PARENT_PROFILE.relationship}</b>
                                                </p>
                                                <p>
                                                    <i className="bi bi-envelope-fill"></i>
                                                    {PARENT_PROFILE.email}
                                                </p>
                                                <div className="login-date">
                                                    <i className="bi bi-clock-history parent-summary-clock-icon"></i>
                                                    Last Login Date - {PARENT_PROFILE.lastLogin}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="parent-summary-phone-wrap">
                                            <p className="parent-summary-phone-label">Phone Number</p>
                                            <h4 className="parent-summary-phone-value">{PARENT_PROFILE.phone}</h4>
                                        </div>
                                    </div>
                                </div>

                                {/* STUDENT Table Card (Where list of suggestions was in reference image) */}
                                <div className="roster-panel-card">
                                    <div className="roster-panel-header">
                                        <div className="roster-panel-heading">
                                            <h3 className="parent-summary-heading-title">
                                                <i className="bi bi-bar-chart-line-fill parent-summary-heading-icon"></i>
                                                STUDENT
                                            </h3>
                                            <p className="roster-count-text">
                                                {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""} linked
                                            </p>
                                        </div>
                                    </div>

                                    <div className="roster-table-wrapper">
                                        <table className="marks-table" id="parentStudentTable">
                                            <thead>
                                                <tr>
                                                    <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                    <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                    <th>Programme <i className="bi bi-arrow-down-up"></i></th>
                                                    <th>Status <i className="bi bi-arrow-down-up"></i></th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredStudents.map((s) => (
                                                    <tr key={s.sn}>
                                                        <td className="marks-table-admission-no">{s.sn}</td>
                                                        <td>
                                                            <div className="marks-table-student">
                                                                <img src={s.img} alt={s.name} />
                                                                <div>
                                                                    <h4>{s.name}</h4>
                                                                    <p>Student ID: {s.sid}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{s.programme}</td>
                                                        <td><StatusBadge status={s.status} /></td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="make-pay-btn"
                                                                onClick={() => openPayment(s)}
                                                            >
                                                                <i className="bi bi-credit-card-fill"></i>
                                                                <span>Make Payment</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredStudents.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="table-empty-cell">
                                                            No linked students found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* =========================================================
                            TAB 2: MY PROFILE VIEW (Matches 4th Reference Image)
                            ========================================================= */}
                        {activeTab === "profile" && (
                            <>
                                <div className="parent-sub-heading">
                                    <i className="bi bi-person-fill"></i>
                                    <span>My Profile</span>
                                </div>

                                {/* Top Summary Bar */}
                                <div className="parent-summary-card">
                                    <div className="parent-summary-inner">
                                        <div className="parent-summary-left">
                                            <div className="parent-avatar-circle">
                                                <img src={PARENT_PROFILE.avatar} alt={PARENT_PROFILE.name} />
                                            </div>
                                            <div className="parent-summary-meta">
                                                <h3>{PARENT_PROFILE.name}</h3>
                                                <p>
                                                    <i className="bi bi-people-fill"></i>
                                                    Relationship: <b>{PARENT_PROFILE.relationship}</b>
                                                </p>
                                                <div className="login-date">
                                                    <i className="bi bi-clock-history parent-summary-clock-icon"></i>
                                                    Last Login Date - {PARENT_PROFILE.lastLogin}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main My Profile Panel (No Update Profile Button) */}
                                <div className="parent-profile-panel">
                                    <div className="parent-profile-panel-heading">
                                        <i className="bi bi-person-circle"></i>
                                        <span>MY PROFILE</span>
                                    </div>

                                    <div className="parent-profile-grid">
                                        {/* Large Avatar */}
                                        <div className="parent-profile-avatar-box">
                                            <div className="parent-profile-large-avatar">
                                                <img src={PARENT_PROFILE.avatar} alt="Profile" />
                                            </div>
                                        </div>

                                        {/* Profile Details (Read-only / Clean layout) */}
                                        <div className="parent-profile-form">
                                            <div className="form-field">
                                                <label>USERNAME: *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={PARENT_PROFILE.username}
                                                />
                                            </div>

                                            <div className="form-field">
                                                <label>FULL NAME: *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={PARENT_PROFILE.name}
                                                />
                                            </div>

                                            <div className="form-field">
                                                <label>EMAIL ADDRESS: *</label>
                                                <input
                                                    type="email"
                                                    readOnly
                                                    value={PARENT_PROFILE.email}
                                                />
                                            </div>

                                            <div className="form-field">
                                                <label>PHONE NUMBER: *</label>
                                                <input
                                                    type="tel"
                                                    readOnly
                                                    value={PARENT_PROFILE.phone}
                                                />
                                            </div>

                                            <div className="form-field">
                                                <label>RELATIONSHIP: *</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={PARENT_PROFILE.relationship}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <PageFooter />
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPayModalOpen}
                onClose={() => setIsPayModalOpen(false)}
                student={paymentStudent}
            />
        </div>
    );
}
