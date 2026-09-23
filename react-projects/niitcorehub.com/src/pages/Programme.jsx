import { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "../components/TopBar";
import PageHeading from "../components/PageHeading";
import PageFooter from "../components/PageFooter";
import { init } from "../JS/programme";

export default function Programme() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="app-layout-container">
            <Sidebar activePage="programme" />

            <main className="main-content-wrapper">
                <TopBar searchPlaceholder="Search Programmes Here..." />

                <div className="dashboard-content-container">
                    <div className="dashboard-content-wrapper">

                        <PageHeading
                            icon="bi-list-ul"
                            tag="Programmes"
                            description="Manage course curriculum, pricing, duration, and student enrollments."
                        />

                        <div className="page-section-wrapper">
                            <div className="programme-panel-card">
                                <div className="programme-panel-header">
                                    <div className="programme-panel-heading">
                                        <h3>All Programmes</h3>
                                        <p className="programme-count-text" id="programmeCount">18 programmes available</p>
                                    </div>
                                    <div className="programme-panel-actions">
                                        <button type="button" id="addProgrammeBtn" className="panel-add-btn">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>Add Programme</span>
                                        </button>
                                    </div>
                                </div>

                                {/* 3-Column Card Grid ("Block Block Block") */}
                                <div className="programme-grid-container" id="programmeGrid">
                                    {/* Rendered dynamically by JS/programme.js */}
                                </div>
                            </div>
                        </div>

                        <PageFooter />

                    </div>
                </div>
            </main>

            {/* Programme Details Modal */}
            <div className="inpage-modal-overlay" id="programmeDetailModal">
                <div className="inpage-modal" style={{ maxWidth: "800px", width: "92vw" }}>
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon">
                                <i className="bi bi-journal-code"></i>
                            </div>
                            <h2>Programme Details</h2>
                        </div>
                        <button type="button" className="inpage-modal-close-btn" id="detailModalCloseBtn" title="Close">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body">
                        <div className="programme-detail-header-card" style={{ flexShrink: 0, minHeight: "140px", height: "140px" }}>
                            <img id="detailCoverImage" src="/all-images/body-images/hardware-networking-course.jpg" alt="Cover" />
                            <div className="programme-detail-header-content">
                                <div>
                                    <h3 id="detailTitle">Hardware &amp; Networking</h3>
                                    <p id="detailSubtitle">PRG-HN101</p>
                                </div>
                                <div className="programme-detail-header-price" id="detailPrice">
                                    ₦80,000
                                </div>
                            </div>
                        </div>

                        <div className="programme-detail-grid">
                            <div className="programme-detail-grid-item">
                                <span>Duration</span>
                                <span id="detailDuration">6 Months</span>
                            </div>
                            <div className="programme-detail-grid-item">
                                <span>Curriculum</span>
                                <span id="detailModules">8 Modules</span>
                            </div>
                            <div className="programme-detail-grid-item">
                                <span>Enrolled</span>
                                <span id="detailCapacity">45 / 50 Students</span>
                            </div>
                            <div className="programme-detail-grid-item">
                                <span>Lead Instructor</span>
                                <span id="detailInstructor">Courtney Henry</span>
                            </div>
                            <div className="programme-detail-grid-item">
                                <span>Schedule</span>
                                <span id="detailSchedule">Mon, Wed, Fri</span>
                            </div>
                            <div className="programme-detail-grid-item">
                                <span>Course Code</span>
                                <span id="detailCode">PRG-SE101</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="programme-curriculum-title">
                                <i className="bi bi-info-circle-fill" style={{ color: "var(--primary-color)" }}></i>
                                &nbsp;About Programme
                            </h4>
                            <p className="inpage-modal-intro" id="detailDescription" style={{ marginTop: "6px" }}></p>
                        </div>

                        <div className="programme-enrolled-section">
                            <h4 className="programme-section-title">
                                <i className="bi bi-people-fill" style={{ color: "var(--primary-color)" }}></i>
                                &nbsp;Enrolled Students (<span id="detailEnrolledCount">0</span>)
                            </h4>
                            <div className="programme-students-list" id="detailEnrolledStudentsList">
                                {/* Injected as individual student items via JS */}
                            </div>
                        </div>
                    </div>

                    <div className="inpage-modal-footer">
                        <button type="button" className="programme-delete-btn" onClick={() => window.confirmDeleteProgramme && window.confirmDeleteProgramme()} title="Delete this programme">
                            <i className="bi bi-trash3-fill"></i>
                            <span>Delete</span>
                        </button>
                        <button type="button" className="inpage-cancel-btn" onClick={() => {
                            const btn = document.getElementById("detailModalCloseBtn");
                            if (btn) btn.click();
                        }}>Close</button>
                        <button type="button" className="inpage-submit-btn" onClick={() => window.openEditProgrammeModal && window.openEditProgrammeModal()}>
                            <i className="bi bi-pencil-square"></i>
                            <span>Edit Fee &amp; Info</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Programme & Fee Modal */}
            <div className="inpage-modal-overlay" id="editProgrammeModal">
                <div className="inpage-modal">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon">
                                <i className="bi bi-pencil-square"></i>
                            </div>
                            <h2>Edit Programme &amp; Tuition Fee</h2>
                        </div>
                        <button type="button" className="inpage-modal-close-btn" id="editModalCloseBtn" title="Close">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body">
                        <p className="inpage-modal-intro">
                            Update the programme details and tuition fee below. Changes will be updated immediately across the
                            catalogue.
                        </p>

                        <form id="editProgrammeForm">
                            <input type="hidden" id="editProgId" />

                            <div className="inpage-form-grid">
                                <div className="inpage-form-field form-field-full">
                                    <label htmlFor="editProgTitle">Programme Title: <span>*</span></label>
                                    <input type="text" id="editProgTitle" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgCode">Programme Code: <span>*</span></label>
                                    <input type="text" id="editProgCode" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgPrice">Tuition Fee (₦): <span>*</span></label>
                                    <input type="text" id="editProgPrice" placeholder="e.g. ₦250,000" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgDuration">Duration: <span>*</span></label>
                                    <input type="text" id="editProgDuration" placeholder="e.g. 6 Months" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgModules">Modules Count: <span>*</span></label>
                                    <input type="text" id="editProgModules" placeholder="e.g. 8 Modules" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgCapacity">Max Student Capacity: <span>*</span></label>
                                    <input type="number" id="editProgCapacity" min="1" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgInstructor">Lead Instructor:</label>
                                    <input type="text" id="editProgInstructor" placeholder="e.g. Courtney Henry" />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="editProgSchedule">Schedule:</label>
                                    <input type="text" id="editProgSchedule" placeholder="e.g. Mon, Wed, Fri • 10am - 1pm" />
                                </div>

                                <div className="inpage-form-field form-field-full">
                                    <label htmlFor="editProgDescription">Programme Description: <span>*</span></label>
                                    <input type="text" id="editProgDescription" required />
                                </div>
                            </div>

                            <div className="inpage-modal-footer" style={{ marginTop: "18px" }}>
                                <button type="button" className="programme-delete-btn" id="editModalDeleteBtn" title="Delete this programme">
                                    <i className="bi bi-trash3-fill"></i>
                                    <span>Delete Programme</span>
                                </button>
                                <button type="button" className="inpage-cancel-btn" id="editModalCancelBtn">Cancel</button>
                                <button type="submit" className="inpage-submit-btn">
                                    <i className="bi bi-check-lg"></i>
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Add Programme Modal */}
            <div className="inpage-modal-overlay" id="addProgrammeModal">
                <div className="inpage-modal">
                    <div className="inpage-modal-header">
                        <div className="inpage-modal-header-title">
                            <div className="inpage-modal-header-icon">
                                <i className="bi bi-plus-circle-fill"></i>
                            </div>
                            <h2>Create New Programme</h2>
                        </div>
                        <button type="button" className="inpage-modal-close-btn" id="addModalCloseBtn" title="Close">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div className="inpage-modal-body">
                        <p className="inpage-modal-intro">
                            Enter the details of the new academic programme below to add it into the EduManage curriculum
                            catalog.
                        </p>

                        <form id="addProgrammeForm">
                            <div className="inpage-form-grid">
                                <div className="inpage-form-field form-field-full">
                                    <label htmlFor="addProgTitle">Programme Title: <span>*</span></label>
                                    <input type="text" id="addProgTitle" placeholder="e.g. Cloud Architecture & Kubernetes" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgCode">Programme Code: <span>*</span></label>
                                    <input type="text" id="addProgCode" placeholder="e.g. PRG-CA501" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgBadge">Award / Badge: <span>*</span></label>
                                    <select id="addProgBadge" required defaultValue="Diploma">
                                        <option value="Diploma">Diploma</option>
                                        <option value="Certificate">Certificate</option>
                                        <option value="Professional">Professional</option>
                                    </select>
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgPrice">Tuition Fee (₦): <span>*</span></label>
                                    <input type="text" id="addProgPrice" placeholder="e.g. ₦200,000" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgDuration">Duration: <span>*</span></label>
                                    <input type="text" id="addProgDuration" placeholder="e.g. 6 Months" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgModules">Number of Modules: <span>*</span></label>
                                    <input type="text" id="addProgModules" placeholder="e.g. 6 Modules" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgCapacity">Max Capacity: <span>*</span></label>
                                    <input type="number" id="addProgCapacity" placeholder="e.g. 40" min="1" defaultValue="40" required />
                                </div>

                                <div className="inpage-form-field">
                                    <label htmlFor="addProgInstructor">Lead Instructor:</label>
                                    <input type="text" id="addProgInstructor" placeholder="e.g. Courtney Henry" />
                                </div>

                                <div className="inpage-form-field form-field-full">
                                    <label htmlFor="addProgSchedule">Schedule:</label>
                                    <input type="text" id="addProgSchedule" placeholder="e.g. Mon, Wed, Fri • 10:00 AM - 1:00 PM" />
                                </div>

                                <div className="inpage-form-field form-field-full">
                                    <label htmlFor="addProgDescription">Programme Description: <span>*</span></label>
                                    <input type="text" id="addProgDescription" placeholder="Brief 1-2 sentence overview of the course" required />
                                </div>
                            </div>

                            <div className="inpage-modal-footer" style={{ marginTop: "18px" }}>
                                <button type="button" className="inpage-cancel-btn" id="addModalCancelBtn">Cancel</button>
                                <button type="submit" className="inpage-submit-btn">
                                    <i className="bi bi-check-lg"></i>
                                    <span>Create Programme</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Alert Overlay */}
            <div className="alert-overlay" id="alertOverlay"></div>
        </div>
    );
}
