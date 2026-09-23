/**
 * ProfileModal — Inline profile view modal (React state controlled).
 * Replaces all raw-JS inpage-modal-visible classList patterns.
 *
 * Props:
 *   isOpen       {boolean}    Whether the modal is visible
 *   onClose      {function}   Called when the user closes the modal
 *   title        {string}     Modal heading text e.g. "Counselor Profile"
 *   icon         {string}     Bootstrap icon class for the header icon
 *   maxWidth     {string}     Optional CSS max-width override (default "560px")
 *   data         {object}     Profile data object:
 *                              { avatar, fullName, status, lastLogin, email, position, phone }
 *   extraSection {ReactNode}  Optional extra section rendered below the basic info grid
 *   onEdit       {function}   If provided, shows an "Edit Info" button that calls this
 */
import defaultBanner from "../assets/body-images/profile-banner.jpg";

export default function ProfileModal({
    isOpen,
    onClose,
    title,
    icon,
    maxWidth = "560px",
    data,
    extraSection,
    onEdit,
    bannerImage,
}) {
    if (!data) return null;

    const banner = bannerImage || data?.banner || defaultBanner;

    return (
        <div
            className={`inpage-modal-overlay${isOpen ? " inpage-modal-visible" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="inpage-modal profile-modal" style={{ maxWidth, width: "92vw" }}>
                <div className="inpage-modal-header">
                    <div className="inpage-modal-header-title">
                        <div className="inpage-modal-header-icon">
                            <i className={`bi ${icon}`}></i>
                        </div>
                        <h2>{title}</h2>
                    </div>
                    <button type="button" className="inpage-modal-close-btn" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="inpage-modal-body" style={{ padding: 0, gap: 0 }}>
                    <div
                        className="profile-modal-banner"
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 30, 80, 0.35) 0%, rgba(5, 15, 35, 0.65) 100%), url(${banner})`,
                            backgroundPosition: "center 35%",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="profile-modal-avatar">
                            <img src={data.avatar} alt={data.fullName} />
                        </div>
                    </div>

                    <div className="profile-modal-identity-bar">
                        <div className="profile-modal-identity">
                            <h2>{data.fullName}</h2>
                            <p className="profile-modal-subline">
                                Status: <b>{data.status}</b>&nbsp;|&nbsp; Last Login: <b>{data.lastLogin}</b>
                            </p>
                        </div>
                        {onEdit && (
                            <button
                                type="button"
                                className="profile-modal-edit-btn"
                                onClick={onEdit}
                                title="Edit Profile Info"
                            >
                                <i className="bi bi-pencil-square"></i>
                                <span>Edit Info</span>
                            </button>
                        )}
                    </div>

                    <div style={{ padding: "20px 24px 24px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <p className="profile-modal-section-title">Basic Information</p>
                            <div className="profile-field-grid">
                                <div className="profile-field profile-field-full">
                                    <label>Full Name</label>
                                    <div className="profile-field-value">{data.fullName || "—"}</div>
                                </div>
                                <div className="profile-field profile-field-full">
                                    <label>Email Address</label>
                                    <div className="profile-field-value">{data.email || "—"}</div>
                                </div>
                                <div className="profile-field">
                                    <label>Position</label>
                                    <div className="profile-field-value">{data.position || "—"}</div>
                                </div>
                                <div className="profile-field">
                                    <label>Phone Number</label>
                                    <div className="profile-field-value">{data.phone || "—"}</div>
                                </div>
                            </div>
                        </div>

                        {extraSection}
                    </div>
                </div>
            </div>
        </div>
    );
}
