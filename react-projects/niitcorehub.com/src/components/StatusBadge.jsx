/**
 * StatusBadge — Colored pill badge for entity statuses.
 * Props:
 *   status  {string}  "Active" | "Inactive" | "Pending" | "Accepted"
 */
export default function StatusBadge({ status }) {
    const variantMap = {
        Active: "status-badge-active",
        Paid: "status-badge-active",
        Inactive: "status-badge-inactive",
        Overdue: "status-badge-inactive",
        Pending: "status-badge-pending",
        Accepted: "status-badge-accepted",
    };
    const variant = variantMap[status] || "status-badge-inactive";
    return (
        <span className={`status-badge ${variant}`}>{status}</span>
    );
}
