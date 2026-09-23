/**
 * SlideDrawer — Slide-over side drawer (React state controlled).
 * Replaces all raw-JS classList.add("side-drawer-visible") patterns.
 *
 * Props:
 *   isOpen   {boolean}    Whether the drawer is visible
 *   onClose  {function}   Called when the user closes the drawer
 *   title    {string}     Drawer heading text
 *   icon     {string}     Bootstrap icon class for the header icon
 *   intro    {string}     Optional intro paragraph text
 *   children {ReactNode}  Form content
 */
export default function SlideDrawer({ isOpen, onClose, title, icon, intro, children }) {
    return (
        <div
            className={`side-drawer-overlay${isOpen ? " side-drawer-visible" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="form-page-left">
                <div className="form-page-header">
                    <div className="form-page-header-title">
                        <div className="form-page-header-icon">
                            <i className={`bi ${icon}`}></i>
                        </div>
                        <h2>{title}</h2>
                    </div>
                    <button type="button" className="form-page-close-btn" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                        <span>Close</span>
                    </button>
                </div>
                <div className="form-page-body">
                    {intro && <p className="form-page-intro">{intro}</p>}
                    {children}
                </div>
            </div>
        </div>
    );
}
