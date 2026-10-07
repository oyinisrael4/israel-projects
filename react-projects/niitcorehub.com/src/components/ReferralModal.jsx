/**
 * ReferralModal - View-only popup for a referral record.
 *
 * Props:
 *   isOpen    {boolean}
 *   onClose   {function}
 *   referral  {object}  The raw referral record from Referrals.jsx
 */
import StatusBadge from "./StatusBadge";

export default function ReferralModal({ isOpen, onClose, referral }) {
    if (!referral) return null;

    function handleClose() {
        onClose();
    }

    const dateObj = referral.dateRegistered ? new Date(referral.dateRegistered) : null;
    const formattedDate = dateObj
        ? dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
        : "-";

    return (
        <div
            className={`inpage-modal-overlay${isOpen ? " inpage-modal-visible" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="inpage-modal referral-modal">

                {/* Header bar */}
                <div className="referral-modal-header">
                    <div className="referral-modal-header-left">
                        <div className="referral-modal-header-icon">
                            <i className="bi bi-arrow-repeat"></i>
                        </div>
                        <span>Referral Record</span>
                    </div>
                    <button type="button" className="inpage-modal-close-btn referral-modal-close" onClick={handleClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="referral-modal-body">

                    {/* Status and date hero strip */}
                    <div className="referral-modal-hero">
                        <div className="referral-modal-hero-badge">
                            <i className="bi bi-link-45deg referral-modal-hero-link-icon"></i>
                        </div>
                        <div className="referral-modal-hero-meta">
                            <p className="referral-modal-hero-label">Referral ID</p>
                            <p className="referral-modal-hero-id">{referral.id?.toUpperCase()}</p>
                        </div>
                        <div className="referral-modal-hero-divider"></div>
                        <div className="referral-modal-hero-meta">
                            <p className="referral-modal-hero-label">Date Registered</p>
                            <p className="referral-modal-hero-value">{formattedDate}</p>
                        </div>
                        <div className="referral-modal-hero-divider"></div>
                        <div className="referral-modal-hero-meta">
                            <p className="referral-modal-hero-label">Status</p>
                            <div className="referral-modal-hero-status">
                                <StatusBadge status={referral.status} />
                            </div>
                        </div>
                    </div>

                    {/* Connection card: Counselor -> Student */}
                    <div className="referral-modal-connection">

                        {/* Counselor side */}
                        <div className="referral-modal-person-card referral-counselor-card">
                            <div className="referral-modal-person-role-tag referral-role-counselor">
                                <i className="bi bi-person-heart"></i>
                                Counselor
                            </div>
                            <div className="referral-modal-person-avatar-wrap">
                                <img
                                    src={referral.counselorImg}
                                    alt={referral.counselorName}
                                    className="referral-modal-person-avatar"
                                />
                                <div className="referral-modal-avatar-ring referral-counselor-ring"></div>
                            </div>
                            <h3 className="referral-modal-person-name">{referral.counselorName}</h3>
                            <div className="referral-modal-person-fields">
                                <div className="referral-modal-field">
                                    <label>Staff ID</label>
                                    <div className="referral-modal-field-value referral-id-pill">
                                        <i className="bi bi-hash"></i>
                                        {referral.counselorStaffId}
                                    </div>
                                </div>
                                <div className="referral-modal-field">
                                    <label>Role</label>
                                    <div className="referral-modal-field-value">Student Counselor</div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow connector */}
                        <div className="referral-modal-arrow-connector">
                            <div className="referral-modal-arrow-line"></div>
                            <div className="referral-modal-arrow-circle">
                                <i className="bi bi-arrow-right"></i>
                            </div>
                            <div className="referral-modal-arrow-line"></div>
                            <p className="referral-modal-arrow-label">referred</p>
                        </div>

                        {/* Student side */}
                        <div className="referral-modal-person-card referral-student-card">
                            <div className="referral-modal-person-role-tag referral-role-student">
                                <i className="bi bi-mortarboard-fill"></i>
                                Student
                            </div>
                            <div className="referral-modal-person-avatar-wrap">
                                <img
                                    src={referral.studentImg}
                                    alt={referral.studentName}
                                    className="referral-modal-person-avatar"
                                />
                                <div className="referral-modal-avatar-ring referral-student-ring"></div>
                            </div>
                            <h3 className="referral-modal-person-name">{referral.studentName}</h3>
                            <div className="referral-modal-person-fields">
                                <div className="referral-modal-field">
                                    <label>Student ID</label>
                                    <div className="referral-modal-field-value referral-id-pill">
                                        <i className="bi bi-hash"></i>
                                        {referral.studentId}
                                    </div>
                                </div>
                                <div className="referral-modal-field">
                                    <label>Enrollment</label>
                                    <div className={`referral-modal-field-value referral-status-value ${referral.status === "Active" ? "ref-active" : referral.status === "Pending" ? "ref-pending" : "ref-inactive"}`}>
                                        <i className={`bi ${referral.status === "Active" ? "bi-check-circle-fill" : referral.status === "Pending" ? "bi-clock-fill" : "bi-x-circle-fill"}`}></i>
                                        {referral.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline / summary footer */}
                    <div className="referral-modal-timeline">
                        <p className="referral-modal-timeline-title">
                            <i className="bi bi-clock-history"></i>
                            Referral Timeline
                        </p>
                        <div className="referral-modal-timeline-steps">
                            <div className="referral-modal-timeline-step referral-step-done">
                                <div className="referral-timeline-dot"></div>
                                <div className="referral-timeline-content">
                                    <p className="referral-timeline-event">Counselor Registered</p>
                                    <p className="referral-timeline-sub">{referral.counselorName} &bull; {referral.counselorStaffId}</p>
                                </div>
                            </div>
                            <div className="referral-modal-timeline-connector"></div>
                            <div className="referral-modal-timeline-step referral-step-done">
                                <div className="referral-timeline-dot"></div>
                                <div className="referral-timeline-content">
                                    <p className="referral-timeline-event">Student Referred</p>
                                    <p className="referral-timeline-sub">{referral.studentName} &bull; {referral.studentId}</p>
                                </div>
                            </div>
                            <div className="referral-modal-timeline-connector"></div>
                            <div className={`referral-modal-timeline-step ${referral.status === "Active" ? "referral-step-done" : referral.status === "Pending" ? "referral-step-pending" : "referral-step-inactive"}`}>
                                <div className="referral-timeline-dot"></div>
                                <div className="referral-timeline-content">
                                    <p className="referral-timeline-event">Enrollment Status</p>
                                    <p className="referral-timeline-sub">{formattedDate} &bull; {referral.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
