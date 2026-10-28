export default function ErrorAlert({ message, title = "Authentication Error", onClose }) {
    if (!message) return null;

    return (
        <div className="auth-error-banner" role="alert" aria-live="assertive">
            <div className="auth-error-icon">
                <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div className="auth-error-content">
                {title && <div className="auth-error-title">{title}</div>}
                <div className="auth-error-text">{message}</div>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    title="Dismiss"
                    className="auth-error-dismiss-btn"
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            )}
        </div>
    );
}
