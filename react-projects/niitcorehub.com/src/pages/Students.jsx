import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { init } from "../JS/students";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";

const STUDENTS = [
    { sn: 1, img: student1, name: "Arlene McCoy", sid: "AD33578", prog: "Web Development", phone: "080 1234 5678", status: "Active", broughtBy: "Adebiyi Abasi", search: "arlene mccoy ad33578 web development adebiyi abasi" },
    { sn: 2, img: student2, name: "Wade Warren", sid: "AD45231", prog: "Data Analysis", phone: "081 2345 6789", status: "Active", broughtBy: "Adebiyi Abasi", search: "wade warren ad45231 data analysis adebiyi abasi" },
    { sn: 3, img: student3, name: "Brooklyn Simmons", sid: "AD67452", prog: "Cybersecurity", phone: "080 3456 7890", status: "Inactive", broughtBy: "Grace Okafor", search: "brooklyn simmons ad67452 cybersecurity grace okafor" },
    { sn: 4, img: student4, name: "Theresa Webb", sid: "AD76133", prog: "Software Engineering", phone: "081 4567 8901", status: "Active", broughtBy: "Grace Okafor", search: "theresa webb ad76133 software engineering grace okafor" },
    { sn: 5, img: student5, name: "Darlene Robertson", sid: "AD98214", prog: "Networking", phone: "080 5678 9012", status: "Active", broughtBy: "", search: "darlene robertson ad98214 networking" },
];

export default function Students() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="students" />

            <main className="main-content-wrapper">
                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search Student Here..." />
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
                                <i className="bi bi-people-fill"></i>
                                <span>Students</span>
                            </div>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Manage student admissions, programmes, and contact details across the institute.
                            </p>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Students</h3>
                                        <p className="roster-count-text" id="studentCount">5 students</p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-funnel"></i>
                                            <select className="roster-filter-select" id="programmeFilter">
                                                <option value="all">All Programmes</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <button type="button" id="addStudentBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Create New Student</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="studentTable">
                                        <thead>
                                            <tr>
                                                <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Student Name <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Programme <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Phone Number <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Status <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="studentTableBody">
                                            {STUDENTS.map((s) => (
                                                <tr key={s.sn} data-programme={s.prog} data-brought-by={s.broughtBy} data-search={s.search}>
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
                                                    <td>{s.prog}</td>
                                                    <td>{s.phone}</td>
                                                    <td>
                                                        <span className={`status-badge ${s.status === "Active" ? "status-badge-active" : "status-badge-inactive"}`}>
                                                            {s.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="table-view-btn" type="button">View</button>
                                                    </td>
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

            {/* Add Student — Slide-Over Drawer */}
            <div className="side-drawer-overlay" id="studentModalOverlay">
                <div className="form-page-left">
                    <div className="form-page-header">
                        <div className="form-page-header-title">
                            <div className="form-page-header-icon"><i className="bi bi-person-plus-fill"></i></div>
                            <h2>Create New Student</h2>
                        </div>
                        <button type="button" className="form-page-close-btn" id="studentModalCloseBtn">
                            <i className="bi bi-x-lg"></i>
                            <span>Close</span>
                        </button>
                    </div>
                    <div className="form-page-body">
                        <p className="form-page-intro">Complete the form below to create a new student record.</p>
                        <form className="form-page-form" id="addStudentForm">
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-person-vcard"></i>
                                    <span>Student Basic Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentFirstName">First Name: *</label>
                                    <input type="text" id="studentFirstName" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentLastName">Last Name: *</label>
                                    <input type="text" id="studentLastName" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentEmail">Email Address: *</label>
                                    <input type="email" id="studentEmail" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentPhone">Phone Number: *</label>
                                    <input type="tel" id="studentPhone" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentAddress">Home Address: *</label>
                                    <input type="text" id="studentAddress" required />
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-mortarboard-fill"></i>
                                    <span>Academic Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentProgramme">Select Programme: *</label>
                                    <select id="studentProgramme" required defaultValue="">
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
                                    <label htmlFor="studentStatus">Select Status: *</label>
                                    <select id="studentStatus" required defaultValue="Active">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="studentBroughtBy">Brought By (Counselor):</label>
                                    <select id="studentBroughtBy" defaultValue="">
                                        <option value="">None</option>
                                        <option>Adebiyi Abasi</option>
                                        <option>Grace Okafor</option>
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
        </div>
    );
}
