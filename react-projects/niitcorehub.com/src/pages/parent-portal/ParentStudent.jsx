import { useState } from "react";
import ParentSidebar from "./ParentSidebar";
import TopBar from "../../components/TopBar";
import PageFooter from "../../components/PageFooter";
import StatusBadge from "../../components/StatusBadge";
import PaymentModal from "./PaymentModal";
import student1 from "../../assets/icon-images/student-1.png";
import student2 from "../../assets/icon-images/student-2.png";
import profile1 from "../../assets/icon-images/profile-1.png";

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

export default function ParentStudent() {
    const [searchValue, setSearchValue] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [paymentStudent, setPaymentStudent] = useState(null);
    const [isPayModalOpen, setIsPayModalOpen] = useState(false);

    function openPayment(student) {
        setPaymentStudent(student);
        setIsPayModalOpen(true);
    }

    const filtered = LINKED_STUDENTS.filter((s) => {
        const q = searchValue.trim().toLowerCase();
        return !q || s.name.toLowerCase().includes(q) || s.sid.toLowerCase().includes(q) || s.programme.toLowerCase().includes(q);
    });

    return (
        <div className="app-layout-container">
            <ParentSidebar
                activePage="student"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-content-wrapper">
                <TopBar
                    searchPlaceholder="Search Student..."
                    searchValue={searchValue}
                    onSearchChange={(e) => setSearchValue(e.target.value)}
                    profileAvatar={profile1}
                    profileName="Mrs. Adunola Ojo"
                    profileRole="Parent / Guardian"
                    navItems={PARENT_NAV}
                    activePage="student"
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        {/* Top Portal Tag */}
                        <div className="parent-portal-top-bar">
                            <h2 className="parent-portal-brand-tag">PARENT/GUARDIAN PORTAL</h2>
                        </div>

                        <div className="parent-sub-heading">
                            <i className="bi bi-people-fill"></i>
                            <span>My Students</span>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Students</h3>
                                        <p className="roster-count-text">{filtered.length} student{filtered.length !== 1 ? "s" : ""}</p>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="parentStudentListTable">
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
                                            {filtered.map((s) => (
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
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="table-empty-cell">No students found.</td>
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

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPayModalOpen}
                onClose={() => setIsPayModalOpen(false)}
                student={paymentStudent}
            />
        </div>
    );
}
