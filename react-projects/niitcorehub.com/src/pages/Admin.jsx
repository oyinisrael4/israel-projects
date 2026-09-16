import { useEffect } from "react";
import Sidebar from "./Sidebar";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import admin3 from "../assets/icon-images/admin-3.png";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import profile2 from "../assets/icon-images/profile-2.png";
import profile3 from "../assets/icon-images/profile-3.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";

import { init } from "../JS/admin";

export default function Admin() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="admin" />

            <main className="main-content-wrapper">
                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search Admin Here..." />
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
                                <i className="bi bi-person-badge-fill"></i>
                                <span>Admin</span>
                            </div>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Manage administrator accounts, roles, and access across the institute.
                            </p>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Administrators</h3>
                                        <p className="roster-count-text" id="adminCount">5 administrators</p>
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
                                        <button type="button" id="addAdminBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Create New Admin</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="people-card-grid" id="adminGrid">
                                    {[
                                        { id: "admin-1", role: "Super Admin", status: "Active", search: "jone copper super admin", img: adminAvatar, name: "Jone Copper", phone: "090 3427 5446", tag: "SUPER ADMIN", bar: "var(--primary-color)" },
                                        { id: "admin-2", role: "President", status: "Active", search: "oladele philip president", img: admin3, name: "Oladele Philip", phone: "090 3427 5446", tag: "ADMIN", bar: "var(--secondary-color)" },
                                        { id: "admin-3", role: "Registrar", status: "Active", search: "kathryn murphy registrar", img: profile2, name: "Kathryn Murphy", phone: "080 9898 7876", tag: "ADMIN", bar: "var(--footer-color)" },
                                        { id: "admin-4", role: "Technologist", status: "Active", search: "wade warren technologist", img: admin4, name: "Wade Warren", phone: "081 2345 6789", tag: "ADMIN", bar: "var(--primary-color)" },
                                        { id: "admin-5", role: "Registrar", status: "Inactive", search: "brooklyn simmons registrar", img: admin5, name: "Brooklyn Simmons", phone: "082 3456 7890", tag: "ADMIN", bar: "var(--secondary-color)" },
                                    ].map((a) => (
                                        <div className="person-card" key={a.id} data-id={a.id} data-role={a.role} data-status={a.status} data-search={a.search}>
                                            <div>
                                                <div className="person-card-avatar">
                                                    <img src={a.img} alt={a.name} />
                                                </div>
                                                <div className="person-card-avatar-bar" style={{ background: a.bar }}></div>
                                            </div>
                                            <div className="person-card-body">
                                                <h4>{a.name}</h4>
                                                <p className="person-card-role">{a.role}</p>
                                                <p className="person-card-contact">{a.phone}</p>
                                                <div className="person-card-meta-row">
                                                    <span className="person-card-role-tag">{a.tag}</span>
                                                    <span className={`status-badge ${a.status === "Active" ? "status-badge-active" : "status-badge-inactive"}`}>{a.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <footer className="dashboard-footer-wrapper">
                            <p>Ac 2026 Made With <i className="bi bi-heart-fill"></i> by NIIT.</p>
                        </footer>
                    </div>
                </div>
            </main>

            {/* Create New Admin — Slide-Over Drawer */}
            <div className="side-drawer-overlay" id="adminModalOverlay">
                <div className="form-page-left">
                    <div className="form-page-header">
                        <div className="form-page-header-title">
                            <div className="form-page-header-icon"><i className="bi bi-person-plus-fill"></i></div>
                            <h2>Create New Admin</h2>
                        </div>
                        <button type="button" className="form-page-close-btn" id="adminModalCloseBtn">
                            <i className="bi bi-x-lg"></i>
                            <span>Close</span>
                        </button>
                    </div>
                    <div className="form-page-body">
                        <p className="form-page-intro">You are about to create a new admin. Please complete the form below with accurate details.</p>
                        <form className="form-page-form" id="addAdminForm">
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-person-vcard"></i>
                                    <span>Admin Basic Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminTitle">Title:</label>
                                    <select id="adminTitle">
                                        <option value="">Select here</option>
                                        <option>Mr</option><option>Mrs</option><option>Miss</option><option>Dr</option><option>Prof</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminFirstName">First Name: *</label>
                                    <input type="text" id="adminFirstName" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminLastName">Last Name: *</label>
                                    <input type="text" id="adminLastName" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminEmail">Email Address: *</label>
                                    <input type="email" id="adminEmail" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminPhone">Phone Number: *</label>
                                    <input type="tel" id="adminPhone" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminAddress">Home Address: *</label>
                                    <input type="text" id="adminAddress" required />
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-shield-lock-fill"></i>
                                    <span>Administrative Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminRole">Select Role: *</label>
                                    <select id="adminRole" required>
                                        <option value="" disabled>Select here</option>
                                        <option>Super Admin</option><option>President</option><option>Registrar</option><option>Technologist</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="adminStatus">Select Status: *</label>
                                    <select id="adminStatus" required>
                                        <option value="" disabled>Select here</option>
                                        <option>Active</option><option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-section students-brought-section" id="studentsBroughtSection">
                                <div className="form-section-title">
                                    <i className="bi bi-people-fill"></i>
                                    <span>Students Brought</span>
                                </div>
                                <p className="form-page-intro" style={{ margin: "-8px 0 4px 0" }}>Tick the students this counselor has brought.</p>
                                <div className="students-brought-list" id="studentsBroughtList">
                                    {[
                                        { img: student1, name: "Arlene McCoy", id: "AD33578" },
                                        { img: student2, name: "Wade Warren", id: "AD45231" },
                                        { img: student3, name: "Brooklyn Simmons", id: "AD67452" },
                                        { img: student4, name: "Theresa Webb", id: "AD76133" },
                                        { img: student5, name: "Darlene Robertson", id: "AD98214" },
                                    ].map((s) => (
                                        <label className="students-brought-option" key={s.id}>
                                            <input type="checkbox" value={s.name} data-id={s.id} />
                                            <img src={s.img} alt={s.name} />
                                            <span>{s.name} — {s.id}</span>
                                        </label>
                                    ))}
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

            {/* Administrative Profile — View Modal */}
            <div className="inpage-modal-overlay" id="profileModalOverlay">
                <div className="inpage-modal profile-modal">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon"><i className="bi bi-person-badge-fill"></i></div>
                            <h2>Administrative Profile</h2>
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
                            <div id="profileStudentsBroughtWrapper" style={{ display: "none" }}>
                                <p className="profile-modal-section-title">Students Brought</p>
                                <div className="profile-students-brought" id="profileStudentsBrought"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
