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
function getBarClass(bar) {
    if (typeof bar === "string") {
        if (bar.includes("secondary")) return "person-card-avatar-bar-secondary";
        if (bar.includes("footer")) return "person-card-avatar-bar-footer";
    }
    return "person-card-avatar-bar-primary";
}

export default function PersonCard({ img, name, roleLabel, phone, tag, status, bar, onClick, dataAttrs = {} }) {
    return (
        <div
            className="person-card cursor-pointer"
            onClick={onClick}
            {...dataAttrs}
        >
            <div>
                <div className="person-card-avatar">
                    <img src={img} alt={name} />
                </div>
                <div className={`person-card-avatar-bar ${getBarClass(bar)}`}></div>
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

