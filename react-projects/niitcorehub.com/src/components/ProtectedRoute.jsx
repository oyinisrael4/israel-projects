import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — Route guard for staff and parent portal pages.
 * Respects AuthContext's loading state to prevent flash redirects.
 */
export default function ProtectedRoute({ children, portal = "staff" }) {
    const { isAuthenticated, loading } = useAuth();

    if (portal === "parent") {
        const parentSession =
            localStorage.getItem("parentSession") ||
            localStorage.getItem("parentUser") ||
            localStorage.getItem("niit_parent_session");

        if (!parentSession) {
            return <Navigate to="/parent-portal/login" replace />;
        }

        return children;
    }

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export function ParentProtectedRoute({ children }) {
    return <ProtectedRoute portal="parent">{children}</ProtectedRoute>;
}
