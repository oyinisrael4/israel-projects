import { Link } from "react-router-dom";
import niitLogo from "../../assets/icon-images/niit-logo.png";
import profile1 from "../../assets/icon-images/profile-1.png";

/**
 * ParentSidebar — Sidebar for the Parent/Guardian portal.
 * Visible on desktop. On mobile, functions as an elegant off-canvas drawer
 * opened by the TopBar hamburger menu.
 */
export default function ParentSidebar({ activePage = "", isOpen = false, onClose }) {
    const navItems = [
        { id: "dashboard", to: "/parent-portal/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
        { id: "student", to: "/parent-portal/student", icon: "bi-people-fill", label: "Student" },
        { id: "payment", to: "/parent-portal/payment", icon: "bi-cash-coin", label: "Payment" },
        { id: "logout", to: "/parent-portal/login", icon: "bi-power", label: "Log-Out" },
    ];

    const handleLinkClick = (id) => {
        if (id === "logout") {
            localStorage.removeItem("parentSession");
            localStorage.removeItem("parentUser");
            localStorage.removeItem("niit_parent_session");
        }
        if (onClose) onClose();
    };

    return (
        <>
            {/* Mobile backdrop overlay */}
            {isOpen && (
                <div
                    className="parent-sidebar-backdrop"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside className={`sidebar-wrapper parent-sidebar-wrapper${isOpen ? " parent-sidebar-open" : ""}`}>
                <div className="parent-sidebar-header-row">
                    <div className="sidebar-logo-wrapper">
                        <img src={niitLogo} alt="NIIT" />
                    </div>

                    {/* Mobile close button */}
                    <button
                        type="button"
                        className="parent-sidebar-close-btn"
                        onClick={onClose}
                        title="Close Menu"
                        aria-label="Close Menu"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="sidebar-profile-card">
                    <div className="sidebar-profile-card-image">
                        <img src={profile1} alt="Parent" />
                    </div>
                    <div className="sidebar-profile-card-text">
                        <h4>Mrs. Adunola Ojo</h4>
                        <p>Parent / Guardian</p>
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
                                <Link
                                    className="sidebar-nav-link"
                                    to={item.to}
                                    onClick={() => handleLinkClick(item.id)}
                                >
                                    <i className={`bi ${item.icon}`}></i>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
