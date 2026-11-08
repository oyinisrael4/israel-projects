import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function BranchModal({
    isOpen,
    onClose,
    branch,
    onSave,
    onDelete,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        if (branch) {
            setForm({
                name: branch.name || "",
                branchId: branch.branchId || "",
                phone: branch.phone || "",
                email: branch.email || "",
                state: branch.state || "",
                location: branch.location || "",
                address: branch.address || "",
                manager: branch.manager || "",
                capacity: branch.capacity || "",
                status: branch.status || "Active",
            });
            setIsEditing(false);
        }
    }, [branch]);

    if (!branch) return null;

    function handleClose() {
        setIsEditing(false);
        onClose();
    }

    function handleSave(e) {
        e.preventDefault();
        if (onSave) {
            onSave({
                ...branch,
                ...form,
            });
        }
        setIsEditing(false);
    }

    function handleToggleStatus() {
        const nextStatus = branch.status === "Active" ? "Inactive" : "Active";
        if (onSave) {
            onSave({
                ...branch,
                status: nextStatus,
            });
        }
    }

    function handleDeleteClick() {
        if (window.confirm(`Are you sure you want to delete ${branch.name}?`)) {
            if (onDelete) onDelete(branch.id || branch.branchId);
            handleClose();
        }
    }

    return (
        <div
            className={`inpage-modal-overlay${isOpen ? " inpage-modal-visible" : ""}`}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="inpage-modal programme-modal-dialog" style={{ maxWidth: "660px", background: "#ffffff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)" }}>
                {/* Modal Header */}
                <div className="inpage-modal-header" style={{ padding: "18px 24px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="inpage-modal-header-title" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            className="inpage-modal-header-icon"
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#ffffff",
                                fontSize: "20px",
                                flexShrink: 0,
                            }}
                        >
                            <i className="bi bi-building-fill"></i>
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: "18px", color: "var(--black-color)", fontFamily: "title-font" }}>
                                {isEditing ? "Edit Branch Details" : branch.name}
                            </h2>
                            <p style={{ margin: "2px 0 0 0", fontSize: "12.5px", color: "#64748b", fontFamily: "body-font" }}>
                                Branch Code: <strong style={{ color: "var(--primary-color)" }}>{branch.branchId}</strong> &bull; {branch.location}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inpage-modal-close-btn"
                        onClick={handleClose}
                        title="Close"
                        style={{ background: "transparent", border: "none", fontSize: "18px", color: "#64748b", cursor: "pointer", padding: "4px 8px", borderRadius: "6px" }}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="inpage-modal-body" style={{ padding: "24px", maxHeight: "75vh", overflowY: "auto" }}>
                    {!isEditing ? (
                        <div className="branch-modal-view" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {/* Status & ID Badge Row */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingBottom: "16px",
                                    borderBottom: "1px solid #e2e8f0",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span className="branch-id-badge" style={{ fontSize: "13px", padding: "4px 10px" }}>{branch.branchId}</span>
                                    <StatusBadge status={branch.status} />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleToggleStatus}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        background: branch.status === "Active" ? "#fef2f2" : "#f0fdf4",
                                        border: `1px solid ${branch.status === "Active" ? "#fca5a5" : "#86efac"}`,
                                        color: branch.status === "Active" ? "#b91c1c" : "#15803d",
                                        borderRadius: "20px",
                                        padding: "5px 12px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                    }}
                                >
                                    <i className={`bi ${branch.status === "Active" ? "bi-toggle-on" : "bi-toggle-off"}`} style={{ fontSize: "14px" }}></i>
                                    <span>Set as {branch.status === "Active" ? "Inactive" : "Active"}</span>
                                </button>
                            </div>

                            {/* Details Grid */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                    gap: "18px 24px",
                                }}
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Branch Name</span>
                                    <span style={{ fontSize: "14.5px", color: "#1e293b", fontWeight: "600" }}>{branch.name}</span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone Number</span>
                                    <a href={`tel:${branch.phone}`} style={{ fontSize: "14.5px", color: "var(--primary-color)", fontWeight: "600", textDecoration: "none" }}>
                                        <i className="bi bi-telephone-fill" style={{ marginRight: "6px", fontSize: "12px" }}></i>
                                        {branch.phone}
                                    </a>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Official Email</span>
                                    <a href={`mailto:${branch.email}`} style={{ fontSize: "14px", color: "var(--primary-color)", textDecoration: "none" }}>
                                        <i className="bi bi-envelope-fill" style={{ marginRight: "6px", fontSize: "12px" }}></i>
                                        {branch.email || "—"}
                                    </a>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Location (City / State)</span>
                                    <span style={{ fontSize: "14px", color: "#1e293b", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                        <i className="bi bi-geo-alt-fill" style={{ color: "var(--secondary-color)", fontSize: "13px" }}></i>
                                        {branch.location}
                                    </span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "1 / -1" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Full Centre Address</span>
                                    <span style={{ fontSize: "13.5px", color: "#334155", background: "#f8fafc", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                        {branch.address || "—"}
                                    </span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Centre Manager / Lead</span>
                                    <span style={{ fontSize: "14px", color: "#1e293b", fontWeight: "500" }}>{branch.manager || "—"}</span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Student Capacity</span>
                                    <span style={{ fontSize: "14px", color: "#1e293b", fontWeight: "500" }}>
                                        <i className="bi bi-people-fill" style={{ marginRight: "6px", color: "#64748b" }}></i>
                                        {branch.capacity ? `${branch.capacity} Students` : "—"}
                                    </span>
                                </div>
                            </div>

                            {/* View Full Branch Analytics & Summary Callout Card */}
                            <div
                                style={{
                                    marginTop: "10px",
                                    padding: "16px",
                                    borderRadius: "10px",
                                    background: "rgba(0, 52, 149, 0.04)",
                                    border: "1px dashed rgba(0, 52, 149, 0.25)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: "12px",
                                }}
                            >
                                <div>
                                    <h4 style={{ margin: 0, fontSize: "14px", color: "var(--primary-color)", fontFamily: "title-font" }}>
                                        <i className="bi bi-graph-up-arrow" style={{ marginRight: "6px" }}></i>
                                        Branch Operations & Analytics
                                    </h4>
                                    <p style={{ margin: "3px 0 0 0", fontSize: "12.5px", color: "#64748b" }}>
                                        View full breakdown of students, faculty, payments, and infrastructure at this centre.
                                    </p>
                                </div>
                                <Link
                                    to={`/branches/${branch.branchId || branch.id}`}
                                    onClick={handleClose}
                                    style={{
                                        height: "36px",
                                        padding: "0 18px",
                                        borderRadius: "20px",
                                        background: "var(--primary-color)",
                                        color: "#ffffff",
                                        fontSize: "12.5px",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        boxShadow: "0 2px 8px rgba(0, 52, 149, 0.2)",
                                    }}
                                >
                                    <span>View Full Summary</span>
                                    <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form id="editBranchForm" onSubmit={handleSave}>
                            <div className="inpage-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <div className="inpage-form-field form-field-full" style={{ gridColumn: "1 / -1" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Branch Name: <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field">
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Branch ID / Code: <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.branchId}
                                        onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field">
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Phone Number: <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="tel"
                                        required
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field">
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Official Email:</label>
                                    <input
                                        type="email"
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field">
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Location (City / State): <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field form-field-full" style={{ gridColumn: "1 / -1" }}>
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Full Address: <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field">
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Centre Manager / Lead:</label>
                                    <input
                                        type="text"
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                                        value={form.manager}
                                        onChange={(e) => setForm({ ...form, manager: e.target.value })}
                                    />
                                </div>

                                <div className="inpage-form-field">
                                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "600" }}>Operating Status:</label>
                                    <select
                                        style={{ width: "100%", height: "40px", padding: "0 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff" }}
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    style={{ height: "40px", padding: "0 18px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ height: "40px", padding: "0 22px", borderRadius: "6px", border: "none", background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)", color: "#fff", cursor: "pointer", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}
                                >
                                    <i className="bi bi-check-lg"></i>
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Modal Footer (View mode) */}
                {!isEditing && (
                    <div className="inpage-modal-footer" style={{ padding: "16px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                            type="button"
                            className="programme-delete-btn"
                            onClick={handleDeleteClick}
                            title="Delete branch"
                            style={{ height: "38px", padding: "0 16px", borderRadius: "6px", border: "1px solid #fee2e2", background: "#fef2f2", color: "#dc2626", cursor: "pointer", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                            <i className="bi bi-trash3-fill"></i>
                            <span>Delete Branch</span>
                        </button>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <Link
                                to={`/branches/${branch.branchId || branch.id}`}
                                onClick={handleClose}
                                style={{
                                    height: "38px",
                                    padding: "0 16px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--primary-color)",
                                    background: "rgba(0, 52, 149, 0.05)",
                                    color: "var(--primary-color)",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                <i className="bi bi-bar-chart-line-fill"></i>
                                <span>Branch Summary</span>
                            </Link>
                            <button
                                type="button"
                                onClick={handleClose}
                                style={{ height: "38px", padding: "0 18px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                style={{ height: "38px", padding: "0 20px", borderRadius: "6px", border: "none", background: "linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)", color: "#fff", cursor: "pointer", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}
                            >
                                <i className="bi bi-pencil-square"></i>
                                <span>Edit Branch</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
