import { Link } from "react-router-dom";
import niitLogo from "../assets/icon-images/niit-logo.png";
import adminAvatar from "../assets/icon-images/admin-avatar.png";
import admin4 from "../assets/icon-images/admin-4.png";
import { useAuth } from "../context/AuthContext";

/**
 * Shared Sidebar component used across all dashboard pages.
 * Pass activePage prop to highlight the current nav item.
 * Supports role-based navigation: Counselors have access to counseling,
 * students, parents (with Add Parent), referrals, etc., while administrative
 * pages (Admin, Staff, Payments) are restricted.
 */
export default function Sidebar({ activePage = "" }) {
    const { user, logout, switchRole } = useAuth();

    const isCounselor =
        (user?.roleName || "").toLowerCase().includes("counselor") ||
        (user?.role || "").toLowerCase().includes("counselor");

    const displayName = user?.firstName
        ? `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()} ${user.lastName ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase() : ""}`.trim()
        : "Israel Oyinlola";

    const displayRole = user?.roleName || "Super Admin";
    const avatarImg = adminAvatar;

    // Full administrative navigation list
    const allNavItems = [
        { id: "dashboard", to: "/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
        { id: "admin", to: "/admin", icon: "bi-person-badge-fill", label: "Admin" },
        { id: "counselor", to: "/counselor", icon: "bi-chat-heart-fill", label: "Counselor" },
        { id: "staff", to: "/staff", icon: "bi-easel2-fill", label: "Staff" },
        { id: "students", to: "/students", icon: "bi-people-fill", label: "Students" },
        { id: "parents", to: "/parents", icon: "bi-house-heart-fill", label: "Parents" },
        { id: "programme", to: "/programme", icon: "bi-list-ul", label: "Programme" },
        { id: "referrals", to: "/referrals", icon: "bi-arrow-repeat", label: "Referrals" },
        { id: "examinations", to: "#", icon: "bi-pencil-square", label: "Examinations" },
        { id: "payments", to: "/payments", icon: "bi-cash-coin", label: "Payments" },
        { id: "report", to: "#", icon: "bi-bar-chart-line-fill", label: "Report" },
        { id: "logout", to: "/login", icon: "bi-power", label: "Log-Out" },
    ];

    // Filter items based on counselor login (if logged in counselor)
    const visibleNavItems = isCounselor
        ? allNavItems.filter((item) => !["admin", "staff", "payments", "report"].includes(item.id))
        : allNavItems;

    return (
        <aside className="sidebar-wrapper">
            <div className="sidebar-logo-wrapper">
                <img src={niitLogo} alt="NIIT" />
            </div>

            <div className="sidebar-profile-card">
                <div className="sidebar-profile-card-image">
                    <img src={avatarImg} alt={displayName} />
                </div>
                <div className="sidebar-profile-card-text">
                    <h4>{displayName}</h4>
                    <p>{displayRole}</p>
                </div>
            </div>

            <nav className="sidebar-nav-wrapper">
                <ul className="sidebar-nav-list">
                    {visibleNavItems.map((item) => (
                        <li
                            key={item.id}
                            className={`sidebar-nav-item${activePage === item.id ? " sidebar-nav-item-active" : ""}`}
                        >
                            <Link
                                className="sidebar-nav-link"
                                to={item.to}
                                onClick={() => {
                                    if (item.id === "logout") {
                                        logout();
                                    }
                                }}
                            >
                                <i className={`bi ${item.icon}`}></i>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
