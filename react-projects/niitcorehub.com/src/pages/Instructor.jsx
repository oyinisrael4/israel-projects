import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { init } from "../JS/instructor";
import teacherAvatar from "../assets/icon-images/teacher-avatar.png";
import staff1 from "../assets/icon-images/staff-1.png";
import staff2 from "../assets/icon-images/staff-2.png";
import instructor4 from "../assets/icon-images/instructor-4.png";

const INSTRUCTORS = [
    { id: "instructor-1", role: "Tutor", status: "Active", search: "courtney henry tutor web development", img: teacherAvatar, name: "Courtney Henry", roleLabel: "Tutor — Diploma in Web Development", phone: "080 3123 4567", tag: "TUTOR", bar: "var(--primary-color)" },
    { id: "instructor-2", role: "Tutor", status: "Inactive", search: "robert fox tutor cybersecurity", img: staff1, name: "Robert Fox", roleLabel: "Tutor — CyberOps & Certified Ethical Hacking", phone: "081 0345 6789", tag: "TUTOR", bar: "var(--footer-color)" },
    { id: "instructor-3", role: "Senior Lecturer", status: "Active", search: "eleanor pena senior lecturer data analysis", img: staff2, name: "Eleanor Pena", roleLabel: "Senior Lecturer — Data Analysis", phone: "081 3456 7890", tag: "SENIOR LECTURER", bar: "var(--secondary-color)" },
    { id: "instructor-4", role: "Lecturer", status: "Active", search: "leslie alexander lecturer networking", img: instructor4, name: "Leslie Alexander", roleLabel: "Lecturer — CCNA / CCNP & IT Essentials", phone: "081 6567 8901", tag: "LECTURER", bar: "var(--primary-color)" },
];

export default function Instructor() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="instructor" />

            <main className="main-content-wrapper">
                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search Instructor Here..." />
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
                                <i className="bi bi-easel2-fill"></i>
                                <span>Instructor</span>
                            </div>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Manage tutors and lecturers, their programmes, and access across the institute.
                            </p>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Instructors</h3>
                                        <p className="roster-count-text" id="instructorCount">4 instructors</p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-funnel"></i>
                                            <select className="roster-filter-select" id="roleFilter">
                                                <option value="all">All Roles</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-toggle2-on"></i>
                                            <select className="roster-filter-select" id="statusFilter">
                                                <option value="all">All Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <button type="button" id="addInstructorBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Create New Instructor</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="people-card-grid" id="instructorGrid">
                                    {INSTRUCTORS.map((ins) => (
                                        <div className="person-card" key={ins.id} data-id={ins.id} data-role={ins.role} data-status={ins.status} data-search={ins.search}>
                                            <div>
                                                <div className="person-card-avatar">
                                                    <img src={ins.img} alt={ins.name} />
                                                </div>
                                                <div className="person-card-avatar-bar" style={{ background: ins.bar }}></div>
                                            </div>
                                            <div className="person-card-body">
                                                <h4>{ins.name}</h4>
                                                <p className="person-card-role">{ins.roleLabel}</p>
                                                <p className="person-card-contact">{ins.phone}</p>
                                                <div className="person-card-meta-row">
                                                    <span className="person-card-role-tag">{ins.tag}</span>
                                                    <span className={`status-badge ${ins.status === "Active" ? "status-badge-active" : "status-badge-inactive"}`}>{ins.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <footer className="dashboard-footer-wrapper">
                            <p>© 2026 Made With <i className="bi bi-heart-fill"></i> by NIIT.</p>
                        </footer>
                    </div>
                </div>
            </main>

            {/* Create New Instructor — Slide-Over Drawer */}
            <div className="side-drawer-overlay" id="instructorModalOverlay">
                <div className="form-page-left">
                    <div className="form-page-header">
                        <div className="form-page-header-title">
                            <div className="form-page-header-icon"><i className="bi bi-person-plus-fill"></i></div>
                            <h2>Create New Instructor</h2>
                        </div>
                        <button type="button" className="form-page-close-btn" id="instructorModalCloseBtn">
                            <i className="bi bi-x-lg"></i>
                            <span>Close</span>
                        </button>
                    </div>
                    <div className="form-page-body">
                        <p className="form-page-intro">Complete the form below to add a new instructor.</p>
                        <form className="form-page-form" id="addInstructorForm">
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-person-vcard"></i>
                                    <span>Instructor Basic Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="instructorTitle">Select Title: *</label>
                                    <select id="instructorTitle" required defaultValue="">
                                        <option value="" disabled>Select here</option>
                                        <option>Mr</option>
                                        <option>Mrs</option>
                                        <option>Miss</option>
                                        <option>Dr</option>
                                    </select>
                                </div>
                                <div className="form-field"><label htmlFor="instructorFirstName">First Name: *</label><input type="text" id="instructorFirstName" required /></div>
                                <div className="form-field"><label htmlFor="instructorLastName">Last Name: *</label><input type="text" id="instructorLastName" required /></div>
                                <div className="form-field"><label htmlFor="instructorEmail">Email Address: *</label><input type="email" id="instructorEmail" required /></div>
                                <div className="form-field"><label htmlFor="instructorPhone">Phone Number: *</label><input type="tel" id="instructorPhone" required /></div>
                                <div className="form-field"><label htmlFor="instructorAddress">Home Address: *</label><input type="text" id="instructorAddress" required /></div>
                            </div>
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <span>Teaching Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="instructorRole">Select Role: *</label>
                                    <select id="instructorRole" required defaultValue="">
                                        <option value="" disabled>Select here</option>
                                        <option>Tutor</option><option>Lecturer</option><option>Senior Lecturer</option><option>Technologist</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="instructorProgramme">Select Programme: *</label>
                                    <select id="instructorProgramme" required defaultValue="">
                                        <option value="" disabled>Select here</option>
                                        <option>Hardware &amp; Networking</option>
                                        <option>Desktop Publishing (MS Office Suite)</option>
                                        <option>MasterMind Series (MIS)</option>
                                        <option>CCNA / CCNP</option>
                                        <option>IT Essentials</option>
                                        <option>Diploma in .NET Technologies</option>
                                        <option>Diploma in Web Development</option>
                                        <option>Data Analysis</option>
                                        <option>Diploma in Java</option>
                                        <option>Diploma in Python</option>
                                        <option>Java with DevOps</option>
                                        <option>Graphics Design</option>
                                        <option>UI/UX Design</option>
                                        <option>Project Management (PMP)</option>
                                        <option>Multimedia</option>
                                        <option>Game Development</option>
                                        <option>CyberOps</option>
                                        <option>Certified Ethical Hacking</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="instructorStatus">Select Status: *</label>
                                    <select id="instructorStatus" required defaultValue="Active">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="form-page-submit-btn">
                                <i className="bi bi-check-lg"></i>
                                <span>Submit</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Instructor Profile — View Modal */}
            <div className="inpage-modal-overlay" id="profileModalOverlay">
                <div className="inpage-modal profile-modal" style={{ maxWidth: "760px", width: "92vw" }}>
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon"><i className="bi bi-easel2-fill"></i></div>
                            <h2>Instructor Profile</h2>
                        </div>
                        <button type="button" className="inpage-modal-close-btn" id="profileModalCloseBtn">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body" style={{ padding: 0, gap: 0 }}>
                        <div className="profile-modal-banner">
                            <div className="profile-modal-avatar">
                                <img id="profileAvatar" src="" alt="" />
                            </div>
                        </div>

                        <div className="profile-modal-identity">
                            <h2 id="profileName">—</h2>
                            <p className="profile-modal-subline">
                                Status: <b id="profileStatus">—</b> &nbsp;|&nbsp; Last Login: <b id="profileLastLogin">—</b>
                            </p>
                        </div>

                        <div style={{ padding: "20px 24px 24px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div>
                                <p className="profile-modal-section-title">Basic Information</p>
                                <div className="profile-field-grid">
                                    <div className="profile-field profile-field-full">
                                        <label>Full Name</label>
                                        <div className="profile-field-value" id="profileFullName">—</div>
                                    </div>
                                    <div className="profile-field profile-field-full">
                                        <label>Email Address</label>
                                        <div className="profile-field-value" id="profileEmail">—</div>
                                    </div>
                                    <div className="profile-field">
                                        <label>Position</label>
                                        <div className="profile-field-value" id="profilePosition">—</div>
                                    </div>
                                    <div className="profile-field">
                                        <label>Phone Number</label>
                                        <div className="profile-field-value" id="profilePhone">—</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
