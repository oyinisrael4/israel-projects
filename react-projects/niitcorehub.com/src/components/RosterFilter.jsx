/**
 * RosterFilter — Filter row with optional dropdowns and an "Add" button.
 * Used on Admin, Counselor, Staff, Students, Parents pages.
 *
 * Props:
 *   heading     {string}   Panel heading text e.g. "All Administrators"
 *   countText   {string}   Count display text e.g. "5 administrators"
 *   filters     {Array}    Array of filter objects: { icon, value, onChange, options: [{value, label}] }
 *   addLabel    {string}   Label for the add button
 *   onAdd       {function} Handler for the add button click
 */
export default function RosterFilter({ heading, countText, filters = [], addLabel, onAdd }) {
    return (
        <div className="roster-panel-header">
            <div className="roster-panel-heading">
                <h3>{heading}</h3>
                <p className="roster-count-text">{countText}</p>
            </div>
            <div className="roster-panel-actions panel-card-header-actions">
                {filters.map((filter, i) => (
                    <div className="roster-filter-wrapper" key={i}>
                        <i className={`bi ${filter.icon}`}></i>
                        <select
                            className="roster-filter-select"
                            value={filter.value}
                            onChange={filter.onChange}
                        >
                            {filter.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <i className="bi bi-chevron-down roster-filter-chevron"></i>
                    </div>
                ))}
                {addLabel && onAdd && (
                    <button type="button" className="panel-add-btn" onClick={onAdd}>
                        <i className="bi bi-plus-lg"></i>
                        <span>{addLabel}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
