/**
 * StatCard — Dashboard statistics card.
 * Props:
 *   icon    {string}  Bootstrap icon class e.g. "bi-person-fill"
 *   label   {string}  Card label text e.g. "Total Students"
 *   value   {string}  Card value text e.g. "3,500"
 *   variant {string}  "primary" | "secondary" | "black" | "footer"
 */
export default function StatCard({ icon, label, value, variant = "primary" }) {
    return (
        <div className={`stat-card stat-card-${variant}`}>
            <div className="stat-card-icon"><i className={`bi ${icon}`}></i></div>
            <p className="stat-card-label">{label}</p>
            <h3 className="stat-card-value">{value}</h3>
        </div>
    );
}
