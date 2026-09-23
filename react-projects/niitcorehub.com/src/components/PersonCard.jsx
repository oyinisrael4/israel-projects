import StatusBadge from "./StatusBadge";

/**
 * PersonCard — Card used on Admin, Counselor, and Staff grid pages.
 * Props:
 *   img       {string}    Image src
 *   name      {string}    Person's full name
 *   roleLabel {string}    Sub-line under the name (role description)
 *   phone     {string}    Phone number
 *   tag       {string}    Role tag label (uppercase) e.g. "SUPER ADMIN"
 *   status    {string}    "Active" | "Inactive"
 *   bar       {string}    CSS color value for the accent bar
 *   onClick   {function}  Click handler (opens profile modal)
 *   dataAttrs {object}    Extra data-* attributes for filtering
 */
export default function PersonCard({ img, name, roleLabel, phone, tag, status, bar, onClick, dataAttrs = {} }) {
    return (
        <div
            className="person-card"
            onClick={onClick}
            style={{ cursor: "pointer" }}
            {...dataAttrs}
        >
            <div>
                <div className="person-card-avatar">
                    <img src={img} alt={name} />
                </div>
                <div className="person-card-avatar-bar" style={{ background: bar }}></div>
            </div>
            <div className="person-card-body">
                <h4>{name}</h4>
                <p className="person-card-role">{roleLabel}</p>
                <p className="person-card-contact">{phone}</p>
                <div className="person-card-meta-row">
                    <span className="person-card-role-tag">{tag}</span>
                    <StatusBadge status={status} />
                </div>
            </div>
        </div>
    );
}
