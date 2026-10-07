/**
 * StudentModal - Dedicated student profile modal matching the NIIT Admin Profile visual theme.
 *
 * Props:
 *   isOpen      {boolean}
 *   onClose     {function}
 *   student     {object}
 *   onSave      {function}
 *   editFields  {Array}
 *   editForm    {object}
 *   setEditForm {function}
 */
import { useState } from "react";

export default function StudentModal({
    isOpen,
    onClose,
    student,
    onSave,
    editFields = [],
    editForm = {},
    setEditForm,
}) {
    const [isEditing, setIsEditing] = useState(false);

    if (!student) return null;

    const editFieldMap = Object.fromEntries(editFields.map((f) => [f.key, f]));

    function handleClose() {
        setIsEditing(false);
        onClose();
    }

    function handleSave(e) {
        e.preventDefault();
        if (onSave) onSave(editForm);
        setIsEditing(false);
    }

    function renderFieldInput(key) {
        const cfg = editFieldMap[key];
        if (!cfg) return null;

        if (cfg.type === "select") {
            return (
                <select
                    id={`sm-${key}`}
                    className="student-modal-field-input"
                    value={editForm[key] || ""}
                    onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                >
                    {(cfg.options || []).map((opt) => (
                        <option key={opt.value ?? opt} value={opt.value ?? opt}>
                            {opt.label ?? opt}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                id={`sm-${key}`}
                type={cfg.type || "text"}
                className="student-modal-field-input"
                value={editForm[key] || ""}
                onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
            />
        );
    }

    return (
        <div
            className={`inpage-modal-overlay${isOpen ? " inpage-modal-visible" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="inpage-modal student-modal">
                {/* Header bar */}
                <div className="student-modal-header">
                    <div className="student-modal-header-left">
                        <div className="student-modal-header-icon">
                            <i className="bi bi-mortarboard-fill"></i>
                        </div>
                        <span>Student Profile</span>
                    </div>
                    <button type="button" className="inpage-modal-close-btn" onClick={handleClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="student-modal-body">
                    {/* Top Hero Banner & Overlapping Avatar */}
                    <div className="student-modal-banner">
                        <div className="student-modal-avatar">
                            <img src={student.img} alt={student.name} />
                        </div>
                    </div>

                    {/* Identity Bar */}
                    <div className="student-modal-identity-bar">
                        <div className="student-modal-identity-info">
                            <h2>{student.name}</h2>
                            <p className="student-modal-subline">
                                Status: <b>{student.status}</b>&nbsp;|&nbsp; Student ID: <b>{student.sid}</b>
                            </p>
                        </div>
                        {isEditing ? (
                            <div className="student-modal-edit-actions">
                                <button
                                    type="button"
                                    className="student-modal-save-btn"
                                    onClick={handleSave}
                                >
                                    <i className="bi bi-check-lg"></i>
                                    <span>Update Profile</span>
                                </button>
                                <button
                                    type="button"
                                    className="student-modal-cancel-btn"
                                    onClick={() => setIsEditing(false)}
                                    title="Cancel"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="student-modal-edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                <i className="bi bi-pencil-square"></i>
                                <span>Edit Info</span>
                            </button>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="student-modal-content-box">
                        <div className="student-modal-section-title">
                            Personal & Academic Information
                        </div>

                        <div className="student-modal-grid">
                            {/* Personal Info Column */}
                            <div className="student-modal-column">
                                <p className="student-modal-column-heading">
                                    <i className="bi bi-person-fill"></i> Personal Details
                                </p>
                                <div className="student-modal-field">
                                    <label htmlFor={isEditing ? "sm-name" : undefined}>Full Name</label>
                                    {isEditing ? renderFieldInput("name") : (
                                        <div className="student-modal-field-value">{student.name || "-"}</div>
                                    )}
                                </div>
                                <div className="student-modal-field">
                                    <label htmlFor={isEditing ? "sm-email" : undefined}>Email Address</label>
                                    {isEditing ? renderFieldInput("email") : (
                                        <div className="student-modal-field-value">{student.email || "-"}</div>
                                    )}
                                </div>
                                <div className="student-modal-field">
                                    <label htmlFor={isEditing ? "sm-phone" : undefined}>Phone Number</label>
                                    {isEditing ? renderFieldInput("phone") : (
                                        <div className="student-modal-field-value">{student.phone || "-"}</div>
                                    )}
                                </div>
                            </div>

                            {/* Academic Info Column */}
                            <div className="student-modal-column">
                                <p className="student-modal-column-heading">
                                    <i className="bi bi-mortarboard-fill"></i> Academic Details
                                </p>
                                <div className="student-modal-field">
                                    <label>Student ID</label>
                                    <div className="student-modal-field-value student-modal-id-pill">
                                        <i className="bi bi-hash"></i>
                                        {student.sid}
                                    </div>
                                </div>
                                <div className="student-modal-field">
                                    <label htmlFor={isEditing ? "sm-prog" : undefined}>Programme</label>
                                    {isEditing ? renderFieldInput("prog") : (
                                        <div className="student-modal-field-value">{student.prog || "-"}</div>
                                    )}
                                </div>
                                <div className="student-modal-field">
                                    <label htmlFor={isEditing ? "sm-status" : undefined}>Status</label>
                                    {isEditing ? renderFieldInput("status") : (
                                        <div className="student-modal-field-value student-modal-status-badge">
                                            <span className={`student-status-indicator ${student.status === "Active" ? "status-active" : "status-inactive"}`}>
                                                <i className={`bi ${student.status === "Active" ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}></i>
                                                {student.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Counselor referral if present */}
                        {student.broughtBy && (
                            <div className="student-modal-counselor-card">
                                <div className="student-modal-counselor-icon">
                                    <i className="bi bi-person-heart"></i>
                                </div>
                                <div className="student-modal-counselor-info">
                                    <h5>{student.broughtBy}</h5>
                                    <p>Admitted through counselor referral</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
