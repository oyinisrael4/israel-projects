/**
 * ProfileModal — Inline profile view/edit modal (React state controlled).
 *
 * Props:
 *   isOpen       {boolean}    Whether the modal is visible
 *   onClose      {function}   Called when the user closes the modal
 *   title        {string}     Modal heading text e.g. "Counselor Profile"
 *   icon         {string}     Bootstrap icon class for the header icon
 *   data         {object}     Profile data object: { avatar, fullName, status, lastLogin, email, position, phone }
 *   extraSection {ReactNode}  Optional extra section rendered below basic info (view mode only)
 *   onEdit       {function}   If provided, an Edit Info button appears to switch into edit mode
 *   editForm     {object}     Controlled form state
 *   setEditForm  {function}   State setter for editForm
 *   onSaveEdit   {function}   Called with the final editForm when user submits
 *   editFields   {Array}      Array of field config objects { key, label, type, options? }
 *                             Keys should match the profile-field-grid fields:
 *                             "fullName" | "name" → Full Name
 *                             "email"              → Email Address
 *                             "position"           → Position
 *                             "phone"              → Phone Number
 */
import { useState } from "react";
import defaultBanner from "../assets/body-images/profile-banner.jpg";

export default function ProfileModal({
    isOpen,
    onClose,
    title,
    icon,
    data,
    extraSection,
    onEdit,
    bannerImage,
    editForm,
    setEditForm,
    onSaveEdit,
    editFields = [],
}) {
    const [isEditing, setIsEditing] = useState(false);

    if (!data) return null;

    const banner = bannerImage || data?.banner || defaultBanner;

    // Build a quick lookup from key → field config so we can render inline inputs
    const editFieldMap = Object.fromEntries(editFields.map((f) => [f.key, f]));

    // The profile view always shows these four fields in this order
    // We map them to the editForm keys as well
    const FIELD_ROWS = [
        { label: "Full Name",                             viewKey: "fullName",  editKey: "name",     fullWidth: true },
        { label: "Email Address",                         viewKey: "email",     editKey: "email",    fullWidth: true },
        { label: data.positionLabel || "Position",        viewKey: data.positionKey || "position",  editKey: data.editPositionKey || "position", fullWidth: false },
        { label: "Phone Number",                          viewKey: "phone",     editKey: "phone",    fullWidth: false },
    ];

    function handleEditClick() {
        setIsEditing(true);
        if (onEdit) onEdit();
    }

    function handleSave(e) {
        e.preventDefault();
        if (onSaveEdit) onSaveEdit(editForm);
        setIsEditing(false);
    }

    function handleClose() {
        setIsEditing(false);
        onClose();
    }

    function renderFieldControl(row) {
        // Find which edit key to use — try "name" for fullName, then fallback to viewKey
        const eKey = editFieldMap[row.editKey]
            ? row.editKey
            : editFieldMap[row.viewKey]
            ? row.viewKey
            : null;

        const fieldCfg = eKey ? editFieldMap[eKey] : null;

        if (!isEditing || !fieldCfg) {
            // View mode — read-only box
            return (
                <div className="profile-field-value">
                    {data[row.viewKey] || "—"}
                </div>
            );
        }

        // Edit mode — inline input or select
        if (fieldCfg.type === "select") {
            return (
                <select
                    id={`pm-edit-${eKey}`}
                    className="profile-field-input"
                    required
                    value={editForm[eKey] || ""}
                    onChange={(e) =>
                        setEditForm({ ...editForm, [eKey]: e.target.value })
                    }
                >
                    {(fieldCfg.options || []).map((opt) => (
                        <option key={opt.value ?? opt} value={opt.value ?? opt}>
                            {opt.label ?? opt}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={fieldCfg.type || "text"}
                id={`pm-edit-${eKey}`}
                className="profile-field-input"
                required
                value={editForm[eKey] || ""}
                onChange={(e) =>
                    setEditForm({ ...editForm, [eKey]: e.target.value })
                }
            />
        );
    }

    return (
        <div
            className={`inpage-modal-overlay${isOpen ? " inpage-modal-visible" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="inpage-modal profile-modal">
                <div className="inpage-modal-header">
                    <div className="inpage-modal-header-title">
                        <div className="inpage-modal-header-icon">
                            <i className={`bi ${icon}`}></i>
                        </div>
                        <h2>{title}</h2>
                    </div>
                    <button type="button" className="inpage-modal-close-btn" onClick={handleClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="inpage-modal-body profile-modal-body-container">
                    <div className="profile-modal-banner">
                        <div className="profile-modal-avatar">
                            <img src={data.avatar} alt={data.fullName} />
                        </div>
                    </div>

                    <div className="profile-modal-identity-bar">
                        <div className="profile-modal-identity">
                            <h2>{data.fullName}</h2>
                            <p className="profile-modal-subline">
                                Status: <b>{data.status}</b>&nbsp;|&nbsp; {data.sublineSecondLabel || "Last Login"}: <b>{data.sublineSecondValue || data.lastLogin || "—"}</b>
                            </p>
                        </div>
                        {onEdit && (
                            isEditing ? (
                                <div className="profile-modal-edit-actions">
                                    <button
                                        type="button"
                                        className="profile-modal-edit-btn profile-modal-save-btn"
                                        onClick={handleSave}
                                        title="Save Changes"
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        <span>Update Profile</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="profile-modal-cancel-inline-btn"
                                        onClick={() => setIsEditing(false)}
                                        title="Cancel Edit"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="profile-modal-edit-btn"
                                    onClick={handleEditClick}
                                    title="Edit Profile Info"
                                >
                                    <i className="bi bi-pencil-square"></i>
                                    <span>Edit Info</span>
                                </button>
                            )
                        )}
                    </div>

                    {/* ─── Unified view/edit body ─── */}
                    <div className="profile-modal-view-box">
                        <div>
                            <p className="profile-modal-section-title">Basic Information</p>
                            <div className="profile-field-grid">
                                {FIELD_ROWS.map((row) => (
                                    <div
                                        key={row.viewKey}
                                        className={`profile-field${row.fullWidth ? " profile-field-full" : ""}`}
                                    >
                                        <label htmlFor={isEditing ? `pm-edit-${row.editKey}` : undefined}>
                                            {row.label}
                                        </label>
                                        {renderFieldControl(row)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra fields from editFields that don't map to the standard rows (e.g. role, status) */}
                        {isEditing && editFields.filter(
                            (f) => !["name", "email", "position", "phone"].includes(f.key)
                        ).length > 0 && (
                            <div>
                                <p className="profile-modal-section-title">Additional Information</p>
                                <div className="profile-field-grid">
                                    {editFields
                                        .filter((f) => !["name", "email", "position", "phone"].includes(f.key))
                                        .map((field) => (
                                            <div className="profile-field" key={field.key}>
                                                <label htmlFor={`pm-edit-${field.key}`}>{field.label}</label>
                                                {field.type === "select" ? (
                                                    <select
                                                        id={`pm-edit-${field.key}`}
                                                        className="profile-field-input"
                                                        required
                                                        value={editForm[field.key] || ""}
                                                        onChange={(e) =>
                                                            setEditForm({ ...editForm, [field.key]: e.target.value })
                                                        }
                                                    >
                                                        {(field.options || []).map((opt) => (
                                                            <option key={opt.value ?? opt} value={opt.value ?? opt}>
                                                                {opt.label ?? opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.type || "text"}
                                                        id={`pm-edit-${field.key}`}
                                                        className="profile-field-input"
                                                        required
                                                        value={editForm[field.key] || ""}
                                                        onChange={(e) =>
                                                            setEditForm({ ...editForm, [field.key]: e.target.value })
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Extra section (e.g. students brought) — only show in view mode */}
                        {!isEditing && extraSection}
                    </div>
                </div>
            </div>
        </div>
    );
}
