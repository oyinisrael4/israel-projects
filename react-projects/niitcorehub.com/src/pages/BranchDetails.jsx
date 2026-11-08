import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageFooter from "../components/PageFooter";
import StatusBadge from "../components/StatusBadge";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import staff1 from "../assets/icon-images/staff-1.png";
import staff2 from "../assets/icon-images/staff-2.png";
import instructor4 from "../assets/icon-images/instructor-4.png";

const ADMIN_NAV = [
    { id: "branches", to: "/branches", icon: "bi-building-fill", label: "Branches" },
    { id: "dashboard", to: "/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
    { id: "admin", to: "/admin", icon: "bi-person-badge-fill", label: "Admin" },
    { id: "counselor", to: "/counselor", icon: "bi-chat-heart-fill", label: "Counselor" },
    { id: "staff", to: "/staff", icon: "bi-easel2-fill", label: "Staff" },
    { id: "students", to: "/students", icon: "bi-people-fill", label: "Students" },
    { id: "parents", to: "/parents", icon: "bi-house-heart-fill", label: "Parents" },
    { id: "programme", to: "/programme", icon: "bi-list-ul", label: "Programme" },
    { id: "referrals", to: "/referrals", icon: "bi-arrow-repeat", label: "Referrals" },
    { id: "payments", to: "/payments", icon: "bi-cash-coin", label: "Payments" },
    { id: "logout", to: "/login", icon: "bi-power", label: "Log-Out" },
];

const DEFAULT_BRANCHES = [
    {
        id: "branch-1",
        sn: 1,
        branchId: "BR-001",
        name: "NIIT Agbara Centre",
        phone: "0803 456 7890",
        email: "agbara@niitcorehub.com",
        location: "Agbara, Ogun State",
        state: "Ogun State",
        address: "Plot 12, Commercial Avenue, Agbara Estate, Ogun State",
        manager: "Engr. Femi Adeleke",
        capacity: 120,
        status: "Active",
    },
    {
        id: "branch-2",
        sn: 2,
        branchId: "BR-002",
        name: "NIIT Ikeja Centre",
        phone: "0802 345 6781",
        email: "ikeja@niitcorehub.com",
        location: "Ikeja, Lagos State",
        state: "Lagos State",
        address: "28 Allen Avenue, Ikeja, Lagos State",
        manager: "Mrs. Funke Balogun",
        capacity: 250,
        status: "Active",
    },
    {
        id: "branch-3",
        sn: 3,
        branchId: "BR-003",
        name: "NIIT Victoria Island Centre",
        phone: "0809 123 4567",
        email: "vi@niitcorehub.com",
        location: "Victoria Island, Lagos State",
        state: "Lagos State",
        address: "14 Adeola Odeku Street, Victoria Island, Lagos State",
        manager: "Mr. Chidi Nwosu",
        capacity: 200,
        status: "Active",
    },
    {
        id: "branch-4",
        sn: 4,
        branchId: "BR-004",
        name: "NIIT Surulere Centre",
        phone: "0818 765 4321",
        email: "surulere@niitcorehub.com",
        location: "Surulere, Lagos State",
        state: "Lagos State",
        address: "84 Bode Thomas Street, Surulere, Lagos State",
        manager: "Dr. Babatunde Ojo",
        capacity: 180,
        status: "Active",
    },
    {
        id: "branch-5",
        sn: 5,
        branchId: "BR-005",
        name: "NIIT Abuja Centre",
        phone: "0805 987 6543",
        email: "abuja@niitcorehub.com",
        location: "Garki II, Abuja FCT",
        state: "Abuja FCT",
        address: "Plot 742, Aminu Kano Crescent, Wuse II / Garki, Abuja FCT",
        manager: "Hajiya Amina Bello",
        capacity: 220,
        status: "Active",
    },
    {
        id: "branch-6",
        sn: 6,
        branchId: "BR-006",
        name: "NIIT Port Harcourt Centre",
        phone: "0803 876 5432",
        email: "portharcourt@niitcorehub.com",
        location: "Port Harcourt, Rivers State",
        state: "Rivers State",
        address: "56 Aba Road, Garrison, Port Harcourt, Rivers State",
        manager: "Mr. Ken Saro",
        capacity: 160,
        status: "Active",
    },
    {
        id: "branch-7",
        sn: 7,
        branchId: "BR-007",
        name: "NIIT Ibadan Centre",
        phone: "0812 345 9876",
        email: "ibadan@niitcorehub.com",
        location: "Bodija, Ibadan, Oyo State",
        state: "Oyo State",
        address: "19 Awolowo Avenue, Old Bodija, Ibadan, Oyo State",
        manager: "Prof. Sola Adeyemi",
        capacity: 150,
        status: "Inactive",
    },
];

export default function BranchDetails() {
    const { branchId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [studentSearch, setStudentSearch] = useState("");
    const [paymentSearch, setPaymentSearch] = useState("");

    // Load branches from localStorage
    const branches = useMemo(() => {
        try {
            const saved = localStorage.getItem("niit_branches_data");
            if (saved) return JSON.parse(saved);
        } catch {
            // Ignore
        }
        return DEFAULT_BRANCHES;
    }, []);

    // Find current branch by branchId or id
    const currentBranch = useMemo(() => {
        return (
            branches.find(
                (b) =>
                    String(b.branchId).toLowerCase() === String(branchId).toLowerCase() ||
                    String(b.id).toLowerCase() === String(branchId).toLowerCase()
            ) || branches[0]
        );
    }, [branches, branchId]);

    // Mock Branch-specific Operational Data
    const branchStudents = useMemo(() => {
        return [
            { id: "ST-01", name: "Arlene McCoy", sid: "AD33578", prog: "Diploma in Web Development", phone: "080 1234 5678", email: "arlene@niit.edu", status: "Active", tuition: "Paid", img: student1 },
            { id: "ST-02", name: "Wade Warren", sid: "AD45231", prog: "Data Analysis & Science", phone: "081 2345 6789", email: "wade@niit.edu", status: "Active", tuition: "Paid", img: student2 },
            { id: "ST-03", name: "Brooklyn Simmons", sid: "AD67452", prog: "CyberOps & Ethical Hacking", phone: "080 3456 7890", email: "brooklyn@niit.edu", status: "Active", tuition: "Pending", img: student3 },
            { id: "ST-04", name: "Theresa Webb", sid: "AD76133", prog: "Diploma in Python Technologies", phone: "081 4567 8901", email: "theresa@niit.edu", status: "Active", tuition: "Paid", img: student4 },
            { id: "ST-05", name: "Darlene Robertson", sid: "AD98214", prog: "Hardware & Networking (CCNA)", phone: "080 5678 9012", email: "darlene@niit.edu", status: "Inactive", tuition: "Overdue", img: student5 },
            { id: "ST-06", name: "Jacob Jones", sid: "AD55120", prog: "UI/UX Product Design", phone: "080 9988 7766", email: "jacob@niit.edu", status: "Active", tuition: "Paid", img: student1 },
            { id: "ST-07", name: "Kristin Watson", sid: "AD88901", prog: "Cloud Architecture & DevOps", phone: "081 5544 3322", email: "kristin@niit.edu", status: "Active", tuition: "Pending", img: student2 },
        ];
    }, [currentBranch]);

    const branchPayments = useMemo(() => {
        return [
            { ref: "TXN-88210", student: "Arlene McCoy", prog: "Diploma in Web Development", amount: "₦250,000", date: "28 Oct 2026", method: "Online Card", status: "Paid" },
            { ref: "TXN-88211", student: "Wade Warren", prog: "Data Analysis & Science", amount: "₦220,000", date: "24 Oct 2026", method: "Bank Transfer", status: "Paid" },
            { ref: "TXN-88212", student: "Brooklyn Simmons", prog: "CyberOps & Ethical Hacking", amount: "₦180,000", date: "19 Oct 2026", method: "Online Card", status: "Pending" },
            { ref: "TXN-88213", student: "Theresa Webb", prog: "Diploma in Python Technologies", amount: "₦200,000", date: "15 Oct 2026", method: "Bank Transfer", status: "Paid" },
            { ref: "TXN-88214", student: "Jacob Jones", prog: "UI/UX Product Design", amount: "₦195,000", date: "12 Oct 2026", method: "Online Card", status: "Paid" },
            { ref: "TXN-88215", student: "Kristin Watson", prog: "Cloud Architecture & DevOps", amount: "₦240,000", date: "08 Oct 2026", method: "Bank Transfer", status: "Pending" },
        ];
    }, [currentBranch]);

    const branchFaculty = useMemo(() => {
        return [
            { id: "FC-01", name: "Courtney Henry", role: "Lead Tutor", prog: "Web Development", phone: "080 3123 4567", email: "courtney@niit.edu", status: "Active", img: teacherAvatar },
            { id: "FC-02", name: "Eleanor Pena", role: "Senior Lecturer", prog: "Data Science & AI", phone: "081 3456 7890", email: "eleanor@niit.edu", status: "Active", img: staff2 },
            { id: "FC-03", name: "Leslie Alexander", role: "Lecturer", prog: "Networking & CCNA", phone: "081 6567 8901", email: "leslie@niit.edu", status: "Active", img: instructor4 },
            { id: "FC-04", name: "Robert Fox", role: "Tutor", prog: "Cybersecurity", phone: "081 0345 6789", email: "robert@niit.edu", status: "Active", img: staff1 },
        ];
    }, [currentBranch]);

    const branchProgrammes = useMemo(() => {
        return [
            { code: "PRG-WD101", title: "Diploma in Web Development", studentsCount: 28, duration: "6 Months", fee: "₦250,000", lead: "Courtney Henry" },
            { code: "PRG-DS202", title: "Data Analysis & Python Science", studentsCount: 24, duration: "6 Months", fee: "₦220,000", lead: "Eleanor Pena" },
            { code: "PRG-CY303", title: "CyberOps & Ethical Hacking", studentsCount: 19, duration: "4 Months", fee: "₦200,000", lead: "Robert Fox" },
            { code: "PRG-NW404", title: "Hardware & CCNA Networking", studentsCount: 22, duration: "6 Months", fee: "₦180,000", lead: "Leslie Alexander" },
            { code: "PRG-UX505", title: "UI/UX Product Design Masterclass", studentsCount: 16, duration: "3 Months", fee: "₦195,000", lead: "Courtney Henry" },
        ];
    }, [currentBranch]);

    // Calculations
    const totalStudents = 109;
    const capacity = currentBranch?.capacity || 150;
    const occupancyRate = Math.min(Math.round((totalStudents / capacity) * 100), 100);

    const filteredStudents = useMemo(() => {
        const q = studentSearch.trim().toLowerCase();
        if (!q) return branchStudents;
        return branchStudents.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                s.sid.toLowerCase().includes(q) ||
                s.prog.toLowerCase().includes(q)
        );
    }, [branchStudents, studentSearch]);

    const filteredPayments = useMemo(() => {
        const q = paymentSearch.trim().toLowerCase();
        if (!q) return branchPayments;
        return branchPayments.filter(
            (p) =>
                p.student.toLowerCase().includes(q) ||
                p.ref.toLowerCase().includes(q) ||
                p.prog.toLowerCase().includes(q)
        );
    }, [branchPayments, paymentSearch]);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="branches" />

            <main className="main-content-wrapper">
                <TopBar
                    profileAvatar={adminAvatar}
                    profileName="Israel Oyinlola"
                    profileRole="Super Admin"
                    navItems={ADMIN_NAV}
                    activePage="branches"
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        {/* Top Breadcrumb & Switcher Row */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                            <Link
                                to="/branches"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "var(--primary-color)",
                                    textDecoration: "none",
                                    fontFamily: "sub-title-font",
                                    fontSize: "13.5px",
                                    fontWeight: "600",
                                }}
                            >
                                <i className="bi bi-arrow-left"></i>
                                <span>Back to All Branches</span>
                            </Link>

                            {/* Branch Quick Switcher */}
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Switch Branch:</span>
                                <select
                                    value={currentBranch.branchId}
                                    onChange={(e) => navigate(`/branches/${e.target.value}`)}
                                    style={{
                                        height: "36px",
                                        padding: "0 14px",
                                        borderRadius: "20px",
                                        border: "1px solid #cbd5e1",
                                        background: "#ffffff",
                                        fontSize: "13px",
                                        fontFamily: "sub-title-font",
                                        color: "#334155",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        outline: "none",
                                    }}
                                >
                                    {branches.map((b) => (
                                        <option key={b.id || b.branchId} value={b.branchId}>
                                            {b.name} ({b.branchId})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Branch Hero Identity Banner */}
                        <div
                            style={{
                                background: "#ffffff",
                                borderRadius: "14px",
                                padding: "24px 28px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "20px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                                <div
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "16px",
                                        background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#ffffff",
                                        fontSize: "28px",
                                        boxShadow: "0 6px 16px rgba(0, 52, 149, 0.25)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <i className="bi bi-buildings"></i>
                                </div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                                        <h1 style={{ margin: 0, fontSize: "24px", color: "var(--primary-color)", fontFamily: "title-font", letterSpacing: "-0.3px" }}>
                                            {currentBranch.name}
                                        </h1>
                                        <span className="branch-id-badge" style={{ fontSize: "12px", padding: "4px 10px" }}>
                                            {currentBranch.branchId}
                                        </span>
                                        <StatusBadge status={currentBranch.status} />
                                    </div>
                                    <p style={{ margin: "6px 0 0 0", color: "#64748b", fontSize: "13.5px", fontFamily: "body-font" }}>
                                        <i className="bi bi-geo-alt-fill" style={{ color: "var(--secondary-color)", marginRight: "6px" }}></i>
                                        {currentBranch.address} &bull; <strong style={{ color: "#334155" }}>Head:</strong> {currentBranch.manager || "Engr. Femi Adeleke"}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                                <a
                                    href={`tel:${currentBranch.phone}`}
                                    style={{
                                        height: "42px",
                                        padding: "0 18px",
                                        borderRadius: "25px",
                                        background: "#f8fafc",
                                        border: "1px solid #cbd5e1",
                                        color: "#334155",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <i className="bi bi-telephone-fill" style={{ color: "var(--primary-color)" }}></i>
                                    <span>{currentBranch.phone}</span>
                                </a>
                                <a
                                    href={`mailto:${currentBranch.email}`}
                                    style={{
                                        height: "42px",
                                        padding: "0 18px",
                                        borderRadius: "25px",
                                        background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                        border: "none",
                                        color: "#ffffff",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        boxShadow: "0 4px 12px rgba(0, 52, 149, 0.2)",
                                    }}
                                >
                                    <i className="bi bi-envelope-fill"></i>
                                    <span>Email Branch</span>
                                </a>
                            </div>
                        </div>

                        {/* Key Performance Metric Cards */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: "16px",
                            }}
                        >
                            {/* Card 1: Students & Capacity */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px 22px",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Enrolled Students</span>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(0, 52, 149, 0.1)", color: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                </div>
                                <h3 style={{ margin: 0, fontSize: "24px", color: "var(--black-color)", fontFamily: "title-font" }}>
                                    {totalStudents} <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "normal" }}>/ {capacity}</span>
                                </h3>
                                <div>
                                    <div style={{ height: "6px", width: "100%", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${occupancyRate}%`, background: "var(--primary-color)", borderRadius: "4px" }}></div>
                                    </div>
                                    <span style={{ fontSize: "11.5px", color: "#64748b", marginTop: "4px", display: "inline-block" }}>
                                        {occupancyRate}% capacity occupancy
                                    </span>
                                </div>
                            </div>

                            {/* Card 2: Tuition Revenue */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px 22px",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Branch Revenue</span>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(34, 197, 94, 0.1)", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-cash-stack"></i>
                                    </div>
                                </div>
                                <h3 style={{ margin: 0, fontSize: "24px", color: "var(--black-color)", fontFamily: "title-font" }}>
                                    ₦18,450,000
                                </h3>
                                <span style={{ fontSize: "11.5px", color: "#16a34a", fontWeight: "600" }}>
                                    <i className="bi bi-arrow-up-right"></i> +12% vs last academic quarter
                                </span>
                            </div>

                            {/* Card 3: Active Programmes */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px 22px",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Active Programmes</span>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255, 102, 0, 0.1)", color: "var(--secondary-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-list-ul"></i>
                                    </div>
                                </div>
                                <h3 style={{ margin: 0, fontSize: "24px", color: "var(--black-color)", fontFamily: "title-font" }}>
                                    {branchProgrammes.length} Course Tracks
                                </h3>
                                <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                                    Full diploma & certificate tracks
                                </span>
                            </div>

                            {/* Card 4: Staff & Faculty */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px 22px",
                                    border: "1px solid #e2e8f0",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Assigned Faculty</span>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(111, 72, 29, 0.1)", color: "var(--footer-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <i className="bi bi-mortarboard-fill"></i>
                                    </div>
                                </div>
                                <h3 style={{ margin: 0, fontSize: "24px", color: "var(--black-color)", fontFamily: "title-font" }}>
                                    {branchFaculty.length} Instructors
                                </h3>
                                <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                                    All certified NIIT teaching staff
                                </span>
                            </div>
                        </div>

                        {/* Operational Navigation Tabs */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                borderBottom: "1px solid #e2e8f0",
                                paddingBottom: "2px",
                                overflowX: "auto",
                            }}
                        >
                            {[
                                { id: "overview", label: "Centre Facilities & Info", icon: "bi-building-gear" },
                                { id: "students", label: `Registered Students (${branchStudents.length})`, icon: "bi-people" },
                                { id: "payments", label: `Tuition & Payments (${branchPayments.length})`, icon: "bi-cash-coin" },
                                { id: "faculty", label: `Staff & Instructors (${branchFaculty.length})`, icon: "bi-person-badge" },
                                { id: "programmes", label: `Active Programmes (${branchProgrammes.length})`, icon: "bi-journal-code" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        height: "40px",
                                        padding: "0 18px",
                                        border: "none",
                                        background: activeTab === tab.id ? "var(--primary-color)" : "transparent",
                                        color: activeTab === tab.id ? "#ffffff" : "#64748b",
                                        borderRadius: "20px",
                                        fontSize: "13px",
                                        fontFamily: "sub-title-font",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        transition: "all 0.2s ease",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <i className={`bi ${tab.icon}`}></i>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* TAB 1: Facilities & Overview */}
                        {activeTab === "overview" && (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                                <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
                                    <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "var(--primary-color)", fontFamily: "title-font", display: "flex", alignItems: "center", gap: "8px" }}>
                                        <i className="bi bi-cpu-fill" style={{ color: "var(--secondary-color)" }}></i>
                                        Lab & Technology Infrastructure
                                    </h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Computer Laboratories</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>2 Dedicated Labs</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Workstation PCs</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>65 High-performance PCs</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Internet Connectivity</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#16a34a" }}>Starlink & Fiber Optic (150 Mbps)</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Power Redundancy</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#16a34a" }}>30kVA Generator + Solar Inverter</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Operating Hours</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>Mon – Sat: 8:00 AM – 6:00 PM</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
                                    <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "var(--primary-color)", fontFamily: "title-font", display: "flex", alignItems: "center", gap: "8px" }}>
                                        <i className="bi bi-shield-check" style={{ color: "var(--secondary-color)" }}></i>
                                        Branch Management & Security
                                    </h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Centre Manager</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>{currentBranch.manager || "Engr. Femi Adeleke"}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Lead Technologist</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>Wade Warren</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Head of Admissions</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>Adebiyi Abasi (Counselor)</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>CCTV Surveillance</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#16a34a" }}>24/7 Active Monitoring</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span style={{ fontSize: "13.5px", color: "#64748b" }}>Established</span>
                                            <span style={{ fontSize: "13.5px", fontWeight: "600", color: "#1e293b" }}>January 2021</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: Students List */}
                        {activeTab === "students" && (
                            <div className="roster-panel-card" style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap", gap: "12px" }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: "17px", fontFamily: "title-font" }}>Registered Students at {currentBranch.name}</h3>
                                        <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#64748b" }}>Showing all active student admissions in this centre</p>
                                    </div>
                                    <div className="page-heading-search" style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            placeholder="Filter students here..."
                                            value={studentSearch}
                                            onChange={(e) => setStudentSearch(e.target.value)}
                                            style={{ height: "38px", width: "240px", padding: "0 36px 0 16px", borderRadius: "20px", border: "1px solid #cbd5e1" }}
                                        />
                                        <i className="bi bi-search" style={{ position: "absolute", right: "14px", top: "11px", color: "#94a3b8" }}></i>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Student Name</th>
                                                <th>Programme</th>
                                                <th>Phone Number</th>
                                                <th>Tuition Status</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.map((s, idx) => (
                                                <tr key={s.id}>
                                                    <td className="marks-table-admission-no">{idx + 1}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={s.img} alt={s.name} />
                                                            <div>
                                                                <h4 style={{ margin: 0 }}>{s.name}</h4>
                                                                <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>ID: {s.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{s.prog}</td>
                                                    <td>{s.phone}</td>
                                                    <td>
                                                        <span
                                                            style={{
                                                                display: "inline-block",
                                                                padding: "3px 10px",
                                                                borderRadius: "12px",
                                                                fontSize: "11.5px",
                                                                fontWeight: "700",
                                                                background: s.tuition === "Paid" ? "#dcfce7" : s.tuition === "Pending" ? "#fef3c7" : "#fee2e2",
                                                                color: s.tuition === "Paid" ? "#15803d" : s.tuition === "Pending" ? "#b45309" : "#b91c1c",
                                                            }}
                                                        >
                                                            {s.tuition}
                                                        </span>
                                                    </td>
                                                    <td><StatusBadge status={s.status} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: Payments & Tuition */}
                        {activeTab === "payments" && (
                            <div className="roster-panel-card" style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap", gap: "12px" }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: "17px", fontFamily: "title-font" }}>Tuition Transactions & Invoices</h3>
                                        <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#64748b" }}>Verified payment records processed through this branch</p>
                                    </div>
                                    <div className="page-heading-search" style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            placeholder="Search payments..."
                                            value={paymentSearch}
                                            onChange={(e) => setPaymentSearch(e.target.value)}
                                            style={{ height: "38px", width: "240px", padding: "0 36px 0 16px", borderRadius: "20px", border: "1px solid #cbd5e1" }}
                                        />
                                        <i className="bi bi-search" style={{ position: "absolute", right: "14px", top: "11px", color: "#94a3b8" }}></i>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table">
                                        <thead>
                                            <tr>
                                                <th>Reference</th>
                                                <th>Student Name</th>
                                                <th>Programme Track</th>
                                                <th>Amount Paid</th>
                                                <th>Payment Date</th>
                                                <th>Channel</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPayments.map((p) => (
                                                <tr key={p.ref}>
                                                    <td><span className="branch-id-badge">{p.ref}</span></td>
                                                    <td><strong>{p.student}</strong></td>
                                                    <td>{p.prog}</td>
                                                    <td style={{ color: "var(--primary-color)", fontWeight: "700" }}>{p.amount}</td>
                                                    <td>{p.date}</td>
                                                    <td>{p.method}</td>
                                                    <td><StatusBadge status={p.status} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: Faculty & Staff */}
                        {activeTab === "faculty" && (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
                                {branchFaculty.map((f) => (
                                    <div
                                        key={f.id}
                                        style={{
                                            background: "#ffffff",
                                            borderRadius: "12px",
                                            padding: "20px",
                                            border: "1px solid #e2e8f0",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                        }}
                                    >
                                        <img
                                            src={f.img}
                                            alt={f.name}
                                            style={{ width: "54px", height: "54px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0" }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <h4 style={{ margin: 0, fontSize: "15px", fontFamily: "title-font" }}>{f.name}</h4>
                                                <StatusBadge status={f.status} />
                                            </div>
                                            <p style={{ margin: "2px 0", fontSize: "12.5px", color: "var(--primary-color)", fontWeight: "600" }}>{f.role}</p>
                                            <p style={{ margin: "2px 0", fontSize: "12px", color: "#64748b" }}>{f.prog}</p>
                                            <div style={{ marginTop: "8px", display: "flex", gap: "12px", fontSize: "12px" }}>
                                                <a href={`tel:${f.phone}`} style={{ color: "#334155", textDecoration: "none" }}>
                                                    <i className="bi bi-telephone"></i> {f.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TAB 5: Active Programmes */}
                        {activeTab === "programmes" && (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
                                {branchProgrammes.map((prg) => (
                                    <div
                                        key={prg.code}
                                        style={{
                                            background: "#ffffff",
                                            borderRadius: "12px",
                                            padding: "22px",
                                            border: "1px solid #e2e8f0",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <span className="branch-id-badge">{prg.code}</span>
                                            <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>{prg.duration}</span>
                                        </div>
                                        <h4 style={{ margin: 0, fontSize: "16px", color: "var(--black-color)", fontFamily: "title-font" }}>
                                            {prg.title}
                                        </h4>
                                        <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                                            Lead Instructor: <strong style={{ color: "#334155" }}>{prg.lead}</strong>
                                        </p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                                            <span style={{ fontSize: "13px", color: "var(--primary-color)", fontWeight: "700" }}>{prg.fee}</span>
                                            <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                                                <i className="bi bi-people" style={{ marginRight: "4px" }}></i>
                                                {prg.studentsCount} Students Enrolled
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <PageFooter />
                    </div>
                </div>
            </main>
        </div>
    );
}

