import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { init } from "../JS/parents";
import admin3 from "../assets/icon-images/admin-3.png";
import admin4 from "../assets/icon-images/admin-4.png";
import admin5 from "../assets/icon-images/admin-5.png";
import profile2 from "../assets/icon-images/profile-2.png";
import student1 from "../assets/icon-images/student-1.png";
import student2 from "../assets/icon-images/student-2.png";
import student3 from "../assets/icon-images/student-3.png";
import student4 from "../assets/icon-images/student-4.png";
import student5 from "../assets/icon-images/student-5.png";

const PARENTS = [
    { id: "parent-1", sn: 1, img: admin3, name: "Mr James McCoy", relation: "Father", studentName: "Arlene McCoy", sid: "AD33578", sImg: student1, phone: "0812 345 6789", email: "james.mccoy@gmail.com", search: "james mccoy arlene ad33578 father" },
    { id: "parent-2", sn: 2, img: profile2, name: "Mrs Patricia Warren", relation: "Mother", studentName: "Wade Warren", sid: "AD45231", sImg: student2, phone: "0803 456 7890", email: "pwarren@yahoo.com", search: "patricia warren wade ad45231 mother" },
    { id: "parent-3", sn: 3, img: admin4, name: "Mr Charles Simmons", relation: "Guardian", studentName: "Brooklyn Simmons", sid: "AD67452", sImg: student3, phone: "0816 567 8901", email: "csimmons@outlook.com", search: "charles simmons brooklyn ad67452 guardian" },
    { id: "parent-4", sn: 4, img: admin5, name: "Mr Henry Webb", relation: "Father", studentName: "Theresa Webb", sid: "AD76133", sImg: student4, phone: "0802 678 9012", email: "henrywebb@niit.ng", search: "henry webb theresa ad76133 father" },
    { id: "parent-5", sn: 5, img: profile2, name: "Mrs Grace Robertson", relation: "Mother", studentName: "Darlene Robertson", sid: "AD98214", sImg: student5, phone: "0809 789 0123", email: "gracerobertson@gmail.com", search: "grace robertson darlene ad98214 mother" },
];

export default function Parents() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="parents" />

            <main className="main-content-wrapper">
                <header className="topbar-wrapper">
                    <div className="topbar-search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Search Parents Here..." />
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
                                <i className="bi bi-house-heart-fill"></i>
                                <span>Parents</span>
                            </div>
                            <p className="page-heading-description">
                                Admin <i className="bi bi-arrow-right"></i> Manage parent and guardian contacts linked to enrolled students.
                            </p>
                        </div>

                        <div className="page-section-wrapper">
                            <div className="roster-panel-card">
                                <div className="roster-panel-header">
                                    <div className="roster-panel-heading">
                                        <h3>All Parents &amp; Guardians</h3>
                                        <p className="roster-count-text" id="parentCount">5 records</p>
                                    </div>
                                    <div className="roster-panel-actions panel-card-header-actions">
                                        <div className="roster-filter-wrapper">
                                            <i className="bi bi-funnel"></i>
                                            <select className="roster-filter-select" id="relationshipFilter">
                                                <option value="all">All Relationships</option>
                                                <option value="Father">Father</option>
                                                <option value="Mother">Mother</option>
                                                <option value="Guardian">Guardian</option>
                                            </select>
                                            <i className="bi bi-chevron-down roster-filter-chevron"></i>
                                        </div>
                                        <button type="button" id="addParentBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Add Parent</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="roster-table-wrapper">
                                    <table className="marks-table" id="parentTable">
                                        <thead>
                                            <tr>
                                                <th>SN <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Parent / Guardian <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Relationship <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Linked Student <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Phone Number <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Email Address <i className="bi bi-arrow-down-up"></i></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="parentTableBody">
                                            {PARENTS.map((p) => (
                                                <tr key={p.id} data-relationship={p.relation} data-search={p.search}>
                                                    <td className="marks-table-admission-no">{p.sn}</td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={p.img} alt={p.name} />
                                                            <div>
                                                                <h4>{p.name}</h4>
                                                                <p>{p.relation}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span className="person-card-role-tag">{p.relation.toUpperCase()}</span></td>
                                                    <td>
                                                        <div className="marks-table-student">
                                                            <img src={p.sImg} alt={p.studentName} />
                                                            <div>
                                                                <h4>{p.studentName}</h4>
                                                                <p>{p.sid}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{p.phone}</td>
                                                    <td>{p.email}</td>
                                                    <td><button className="table-view-btn" type="button" data-parent={p.id}>View</button></td>
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

            {/* Add Parent / Guardian — Slide-Over Drawer */}
            <div className="side-drawer-overlay" id="parentModalOverlay">
                <div className="form-page-left">
                    <div className="form-page-header">
                        <div className="form-page-header-title">
                            <div className="form-page-header-icon"><i className="bi bi-person-plus-fill"></i></div>
                            <h2>Add Parent / Guardian</h2>
                        </div>
                        <button type="button" className="form-page-close-btn" id="parentModalCloseBtn">
                            <i className="bi bi-x-lg"></i>
                            <span>Close</span>
                        </button>
                    </div>
                    <div className="form-page-body">
                        <p className="form-page-intro">Complete the form below to add a new parent or guardian record.</p>
                        <form className="form-page-form" id="addParentForm">
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-person-vcard"></i>
                                    <span>Parent / Guardian Info</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="parentTitle">Select Title: *</label>
                                    <select id="parentTitle" required defaultValue="">
                                        <option value="" disabled>Select here</option>
                                        <option>Mr</option>
                                        <option>Mrs</option>
                                        <option>Miss</option>
                                        <option>Dr</option>
                                    </select>
                                </div>
                                <div className="form-field"><label htmlFor="parentFirstName">First Name: *</label><input type="text" id="parentFirstName" required /></div>
                                <div className="form-field"><label htmlFor="parentLastName">Last Name: *</label><input type="text" id="parentLastName" required /></div>
                                <div className="form-field">
                                    <label htmlFor="parentRelationship">Relationship: *</label>
                                    <select id="parentRelationship" required defaultValue="">
                                        <option value="" disabled>Select here</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Guardian">Guardian</option>
                                    </select>
                                </div>
                                <div className="form-field"><label htmlFor="parentPhone">Phone Number: *</label><input type="tel" id="parentPhone" required /></div>
                                <div className="form-field"><label htmlFor="parentEmail">Email Address: *</label><input type="email" id="parentEmail" required /></div>
                                <div className="form-field"><label htmlFor="parentAddress">Home Address:</label><input type="text" id="parentAddress" /></div>
                            </div>
                            <div className="form-section">
                                <div className="form-section-title">
                                    <i className="bi bi-people-fill"></i>
                                    <span>Linked Student</span>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="parentLinkedStudent">Select Student: *</label>
                                    <select id="parentLinkedStudent" required defaultValue="">
                                        <option value="" disabled>Select here</option>
                                        <option value="Arlene McCoy — AD33578">Arlene McCoy — AD33578</option>
                                        <option value="Wade Warren — AD45231">Wade Warren — AD45231</option>
                                        <option value="Brooklyn Simmons — AD67452">Brooklyn Simmons — AD67452</option>
                                        <option value="Theresa Webb — AD76133">Theresa Webb — AD76133</option>
                                        <option value="Darlene Robertson — AD98214">Darlene Robertson — AD98214</option>
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

            {/* Parent / Guardian Profile View Modal */}
            <div className="inpage-modal-overlay" id="parentProfileModalOverlay">
                <div className="inpage-modal profile-modal">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon"><i className="bi bi-house-heart-fill"></i></div>
                            <h2>Parent / Guardian Profile</h2>
                        </div>
                        <button type="button" className="inpage-modal-close-btn" id="parentProfileCloseBtn">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body" style={{ padding: 0, gap: 0 }}>
                        <div className="profile-modal-banner">
                            <div className="profile-modal-avatar">
                                <img id="parentProfileAvatar" src="" alt="" />
                            </div>
                        </div>

                        <div className="profile-modal-identity">
                            <h2 id="parentProfileName">—</h2>
                            <p className="profile-modal-subline">
                                Relationship: <b id="parentProfileRelation">—</b>
                            </p>
                        </div>

                        <div style={{ padding: "20px 24px 24px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div>
                                <p className="profile-modal-section-title">Contact Information</p>
                                <div className="profile-field-grid">
                                    <div className="profile-field profile-field-full">
                                        <label>Full Name</label>
                                        <div className="profile-field-value" id="parentProfileFullName">—</div>
                                    </div>
                                    <div className="profile-field profile-field-full">
                                        <label>Email Address</label>
                                        <div className="profile-field-value" id="parentProfileEmail">—</div>
                                    </div>
                                    <div className="profile-field">
                                        <label>Phone Number</label>
                                        <div className="profile-field-value" id="parentProfilePhone">—</div>
                                    </div>
                                    <div className="profile-field">
                                        <label>Relationship</label>
                                        <div className="profile-field-value" id="parentProfileRelationField">—</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="profile-modal-section-title">Linked Student</p>
                                <div className="profile-students-brought" id="parentProfileLinkedStudent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
