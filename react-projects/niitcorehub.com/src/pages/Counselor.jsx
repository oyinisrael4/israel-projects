import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { init } from "../JS/counselor";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";

const COUNSELORS = [
    { id: "counselor-1", status: "Active", search: "adebiyi abasi counselor", img: admin4, name: "Adebiyi Abasi", phone: "080 6046 8880", bar: "var(--primary-color)" },
    { id: "counselor-2", status: "Inactive", search: "grace okafor counselor", img: admin5, name: "Grace Okafor", phone: "080 3709 5149", bar: "var(--secondary-color)" },
];

export default function Counselor() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="counselor" />

            <main className="main-content-wrapper">
                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search Counselor Here..." />
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
                                <i className="bi bi-chat-heart-fill"></i>
                                <span>Counselor</span>
                            </div>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Manage student counselors and track admissions brought through each counselor.
                            </p>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Counselors</h3>
                                        <p className="roster-count-text" id="counselorCount">2 counselors</p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-toggle2-on"></i>
                                            <select className="roster-filter-select" id="statusFilter">
                                                <option value="all">All Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <button type="button" id="addCounselorBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Create New Counselor</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="people-card-grid" id="counselorGrid">
                                    {COUNSELORS.map((c) => (
                                        <div className="person-card" key={c.id} data-id={c.id} data-status={c.status} data-search={c.search}>
                                            <div>
                                                <div className="person-card-avatar">
                                                    <img src={c.img} alt={c.name} />
                                                </div>
                                                <div className="person-card-avatar-bar" style={{ background: c.bar }}></div>
                                            </div>
                                            <div className="person-card-body">
                                                <h4>{c.name}</h4>
                                                <p className="person-card-role">Student Counselor</p>
                                                <p className="person-card-contact">{c.phone}</p>
                                                <div className="person-card-meta-row">
                                                    <span className="person-card-role-tag">COUNSELOR</span>
                                                    <span className={`status-badge ${c.status === "Active" ? "status-badge-active" : "status-badge-inactive"}`}>{c.status}</span>
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

            {/* Create New Counselor — Slide-Over Drawer */}
            <div className="side-drawer-overlay" id="counselorModalOverlay">
                <div className="form-page-left">
                    <div className="form-page-header">
                        <div className="form-page-header-title">
                            <div className="form-page-header-icon"><i className="bi bi-person-plus-fill"></i></div>
                            <h2>Create New Counselor</h2>
                        </div>
                        <button type="button" className="form-page-close-btn" id="counselorModalCloseBtn">
                            <i className="bi bi-x-lg"></i>
                            <span>Close</span>
                        </button>
                    </div>
                    <div className="form-page-body">
                        <p className="form-page-intro">Complete the form below to add a new counselor.</p>
                        <form className="form-page-form" id="addCounselorForm">
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-person-vcard"></i>
                                    <span>Counselor Basic Info</span>
                                </div>
                                <div className="form-field"><label htmlFor="counselorFirstName">First Name: *</label><input type="text" id="counselorFirstName" required /></div>
                                <div className="form-field"><label htmlFor="counselorLastName">Last Name: *</label><input type="text" id="counselorLastName" required /></div>
                                <div className="form-field"><label htmlFor="counselorEmail">Email Address: *</label><input type="email" id="counselorEmail" required /></div>
                                <div className="form-field"><label htmlFor="counselorPhone">Phone Number: *</label><input type="tel" id="counselorPhone" required /></div>
                                <div className="form-field">
                                    <label htmlFor="counselorStatus">Status: *</label>
                                    <select id="counselorStatus" required defaultValue="Active">
                                        <option value="Active">Active</option><option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-section" id="counselorStudentsBroughtSection">
                                <div className="form-section-title">
                                    <i className="bi bi-people-fill"></i>
                                    <span>Students Brought</span>
                                </div>
                                <p className="form-page-intro" style={{ margin: "-8px 0 4px 0" }}>Tick the students this counselor has brought.</p>
                                <div className="students-brought-list" id="counselorStudentsList">
                                    {[
                                        { img: student1, name: "Arlene McCoy", id: "AD33578" },
                                        { img: student2, name: "Wade Warren", id: "AD45231" },
                                        { img: student3, name: "Brooklyn Simmons", id: "AD67452" },
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

            {/* Counselor Profile — View Modal */}
            <div className="inpage-modal-overlay" id="profileModalOverlay">
                <div className="inpage-modal profile-modal">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon"><i className="bi bi-chat-heart-fill"></i></div>
                            <h2>Counselor Profile</h2>
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

                            <div id="profileStudentsBroughtWrapper">
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
