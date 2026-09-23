/**
 * TopBar — Shared top navigation bar used on every dashboard page.
 * Props:
 *   searchPlaceholder  {string}   Placeholder text for the search input
 *   searchValue        {string}   Controlled value of the search input
 *   onSearchChange     {function} onChange handler for the search input
 */
export default function TopBar({ searchPlaceholder = "Search", searchValue = "", onSearchChange }) {
    return (
        <header className="topbar-wrapper">
            <div className="topbar-search-box">
                <i className="bi bi-search"></i>
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={onSearchChange}
                />
            </div>
            <div className="topbar-actions-wrapper">
                <button className="topbar-icon-btn" title="Theme">
                    <i className="bi bi-sun-fill"></i>
                </button>
                <button className="topbar-icon-btn" title="Language">
                    <i className="bi bi-globe2"></i>
                </button>
                <button className="topbar-icon-btn topbar-notification-btn" title="Notifications">
                    <i className="bi bi-bell-fill"></i>
                    <span className="topbar-notification-dot"></span>
                </button>
            </div>
        </header>
    );
}
