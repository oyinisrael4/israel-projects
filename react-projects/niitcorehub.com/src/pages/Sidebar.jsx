import { Link } from "react-router-dom";
import niitLogo from "../assets/icon-images/niit-logo.png";
import adminAvatar from "../assets/icon-images/admin-avatar.png";

/**
 * Shared Sidebar component used across all dashboard pages.
 * Pass activePage prop to highlight the current nav item.
 */
export default function Sidebar({ activePage = "" }) {
    const navItems = [
        { id: "dashboard", to: "/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
        { id: "admin", to: "/admin", icon: "bi-person-badge-fill", label: "Admin" },
        { id: "counselor", to: "/counselor", icon: "bi-chat-heart-fill", label: "Counselor" },
        { id: "instructor", to: "/instructor", icon: "bi-easel2-fill", label: "Instructor" },
        { id: "students", to: "/students", icon: "bi-people-fill", label: "Students" },
        { id: "parents", to: "/parents", icon: "bi-house-heart-fill", label: "Parents" },
        { id: "programme", to: "/programme", icon: "bi-list-ul", label: "Programme" },
        { id: "examinations", to: "#", icon: "bi-pencil-square", label: "Examinations" },
        { id: "payments", to: "/payments", icon: "bi-cash-coin", label: "Payments" },
        { id: "report", to: "#", icon: "bi-bar-chart-line-fill", label: "Report" },
    ];

    return (
        <aside className="sidebar-wrapper">
            <div className="sidebar-logo-wrapper">
                <img src={niitLogo} alt="NIIT" />
            </div>

            <div className="sidebar-profile-card">
                <div className="sidebar-profile-card-image">
                    <img src={adminAvatar} alt="Jone Copper" />
                </div>
                <div className="sidebar-profile-card-text">
                    <h4>Jone Copper</h4>
                    <p>Admin</p>
                </div>
                <i className="bi bi-chevron-right"></i>
            </div>

            <nav className="sidebar-nav-wrapper">
                <ul className="sidebar-nav-list">
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className={`sidebar-nav-item${activePage === item.id ? " sidebar-nav-item-active" : ""}`}
                        >
                            <Link className="sidebar-nav-link" to={item.to}>
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
