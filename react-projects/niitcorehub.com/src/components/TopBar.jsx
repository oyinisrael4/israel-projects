import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * TopBar — Shared top navigation bar used on every dashboard page.
 */
export default function TopBar({
    searchPlaceholder = "Search",
    searchValue = "",
    onSearchChange,
    profileAvatar,
    profileName = "Israel Oyinlola",
    profileRole = "Super Admin",
    navItems = [],
    activePage = "",
    onMenuClick,
}) {
    const { user, logout } = useAuth();
    const isDemo = Boolean(user?.isDemo || (user?.staffId && String(user.staffId).startsWith("DEMO")));
    const isCounselor =
        (user?.roleName || "").toLowerCase().includes("counselor") ||
        (user?.role || "").toLowerCase().includes("counselor");

    const formattedFirstName = user?.firstName
        ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
        : "";
    const formattedLastName = user?.lastName
        ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
        : "";

    const userFullName = formattedFirstName
        ? `${formattedFirstName} ${formattedLastName}`.trim()
        : null;

    const displayName = userFullName || (profileName && profileName !== "Admin" && profileName !== "Jone Copper" ? profileName : "Israel Oyinlola");
    const displayRole = user?.roleName || (profileRole && profileRole !== "Administrator" ? profileRole : "Super Admin");

    const topbarInitials = (() => {
        const name = displayName || "";
        const parts = name.trim().split(/\s+/);
        if (!name) return "?";
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    })();

    const filteredNavItems = isCounselor
        ? navItems.filter((i) => !["admin", "staff", "payments", "report"].includes(i.id))
        : navItems;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleOutsideClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Close on Escape key
    useEffect(() => {
        function handleEsc(e) {
            if (e.key === "Escape") setIsDropdownOpen(false);
        }
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <header className="topbar-wrapper">
            {/* Mobile Hamburger Button */}
            {onMenuClick && (
                <button
                    type="button"
                    className="topbar-mobile-menu-btn"
                    onClick={onMenuClick}
                    title="Open Navigation Menu"
                    aria-label="Open Navigation Menu"
                >
                    <i className="bi bi-list"></i>
                </button>
            )}

            {/* Search */}
            <div className="topbar-search-box">
                <i className="bi bi-search"></i>
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={onSearchChange}
                />
            </div>

            {/* Right-side actions */}
            <div className="topbar-actions-wrapper">
                {isDemo && (
                    <span className="topbar-demo-badge" title="Demo mode active">
                        <i className="bi bi-shield-check"></i> Demo mode
                    </span>
                )}
                {/* Notification Bell */}
                <button className="topbar-icon-btn topbar-notification-btn" title="Notifications">
                    <i className="bi bi-bell-fill"></i>
                    <span className="topbar-notification-dot"></span>
                </button>

                {/* Profile Avatar — opens dropdown */}
                <div className="topbar-profile-menu" ref={dropdownRef}>
                    <button
                        className={`topbar-profile-btn${isDropdownOpen ? " topbar-profile-btn-active" : ""}`}
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        title={profileName}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                    >
                        {/* Initials avatar — always shows real user initials */}
                        <div className="initials-avatar initials-avatar-topbar" aria-label={displayName}>
                            {topbarInitials}
                        </div>
                        {/* Tiny active indicator ring */}
                        <span className="topbar-profile-online-dot"></span>
                    </button>

                    {/* Dropdown Panel */}
                    {isDropdownOpen && (
                        <div className="topbar-dropdown-panel" role="menu">
                            {/* Profile header inside dropdown */}
                            <div className="topbar-dropdown-header">
                                <div className="topbar-dropdown-avatar-wrap">
                                    <div className="initials-avatar initials-avatar-dropdown" aria-label={displayName}>
                                        {topbarInitials}
                                    </div>
                                </div>
                                <div className="topbar-dropdown-user-info">
                                    <p className="topbar-dropdown-name">{displayName}</p>
                                    <p className="topbar-dropdown-role">{displayRole}</p>
                                </div>
                            </div>

                            <div className="topbar-dropdown-divider" />

                            {/* Nav items */}
                            {filteredNavItems.length > 0 && (
                                <nav className="topbar-dropdown-nav">
                                    {filteredNavItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.to}
                                            className={`topbar-dropdown-nav-item${activePage === item.id ? " topbar-dropdown-nav-item-active" : ""}`}
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                if (item.id === "logout") {
                                                    logout();
                                                }
                                            }}
                                            role="menuitem"
                                        >
                                            <i className={`bi ${item.icon}`}></i>
                                            <span>{item.label}</span>
                                            {activePage === item.id && (
                                                <span className="topbar-dropdown-active-dot"></span>
                                            )}
                                        </Link>
                                    ))}
                                </nav>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
