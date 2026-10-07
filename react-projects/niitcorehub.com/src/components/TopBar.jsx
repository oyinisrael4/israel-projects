import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/**
 * TopBar — Shared top navigation bar used on every dashboard page.
 *
 * Props:
 *   searchPlaceholder  {string}     Placeholder text for search
 *   searchValue        {string}     Controlled search value
 *   onSearchChange     {function}   onChange handler
 *   profileAvatar      {string}     Profile image src
 *   profileName        {string}     Logged-in user's name
 *   profileRole        {string}     Role label (e.g. "Parent / Guardian")
 *   navItems           {Array}      Sidebar nav items to show in the profile dropdown
 *                                   Each item: { id, to, icon, label }
 *   activePage         {string}     Currently active nav item id
 */
export default function TopBar({
    searchPlaceholder = "Search",
    searchValue = "",
    onSearchChange,
    profileAvatar,
    profileName = "Admin",
    profileRole = "Administrator",
    navItems = [],
    activePage = "",
    onMenuClick,
}) {
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
                        {profileAvatar ? (
                            <img src={profileAvatar} alt={profileName} className="topbar-profile-avatar" />
                        ) : (
                            <i className="bi bi-person-circle topbar-profile-fallback-icon"></i>
                        )}
                        {/* Tiny active indicator ring */}
                        <span className="topbar-profile-online-dot"></span>
                    </button>

                    {/* Dropdown Panel */}
                    {isDropdownOpen && (
                        <div className="topbar-dropdown-panel" role="menu">
                            {/* Profile header inside dropdown */}
                            <div className="topbar-dropdown-header">
                                <div className="topbar-dropdown-avatar-wrap">
                                    {profileAvatar ? (
                                        <img src={profileAvatar} alt={profileName} />
                                    ) : (
                                        <i className="bi bi-person-circle"></i>
                                    )}
                                </div>
                                <div className="topbar-dropdown-user-info">
                                    <p className="topbar-dropdown-name">{profileName}</p>
                                    <p className="topbar-dropdown-role">{profileRole}</p>
                                </div>
                            </div>

                            <div className="topbar-dropdown-divider" />

                            {/* Nav items */}
                            {navItems.length > 0 && (
                                <nav className="topbar-dropdown-nav">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.to}
                                            className={`topbar-dropdown-nav-item${activePage === item.id ? " topbar-dropdown-nav-item-active" : ""}`}
                                            onClick={() => setIsDropdownOpen(false)}
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
