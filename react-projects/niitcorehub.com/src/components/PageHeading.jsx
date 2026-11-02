/**
 * PageHeading — Modern, branded page header banner.
 * Displays:
 *   - Branded squircle icon badge with page icon
 *   - Prominent page title and clean descriptive subtitle
 *   - Pill search input with search icon on the right
 *   - Gradient pill action button (e.g. "+ ADD NEW STAFF")
 *
 * Props:
 *   icon              {string}   Bootstrap icon class e.g. "bi-person-badge-fill"
 *   tag               {string}   Fallback title if title is omitted
 *   title             {string}   Page title text e.g. "Administrators"
 *   description       {string}   Subtitle description text
 *   searchValue       {string}   Search input query
 *   onSearchChange    {function} Search change callback
 *   searchPlaceholder {string}   Placeholder e.g. "Search Staff Here..."
 *   actionLabel       {string}   Button label e.g. "ADD NEW STAFF"
 *   onAction          {function} Button click callback
 *   actionIcon        {string}   Bootstrap icon for button, defaults to "bi-plus-square"
 */
export default function PageHeading({
    icon,
    tag,
    title,
    description,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search Here...",
    actionLabel,
    onAction,
    actionIcon = "bi-plus-square",
}) {
    const displayTitle = title || tag;

    return (
        <div className="page-heading-wrapper">
            <div className="page-heading-left">
                {icon && (
                    <div className="page-heading-icon-badge">
                        <i className={`bi ${icon}`}></i>
                    </div>
                )}
                <div className="page-heading-info">
                    {displayTitle && <h1 className="page-heading-title">{displayTitle}</h1>}
                    {description && <p className="page-heading-description">{description}</p>}
                </div>
            </div>

            {(onSearchChange || (actionLabel && onAction)) && (
                <div className="page-heading-right">
                    {onSearchChange && (
                        <div className="page-heading-search">
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchValue || ""}
                                onChange={onSearchChange}
                            />
                            <i className="bi bi-search"></i>
                        </div>
                    )}
                    {actionLabel && onAction && (
                        <button type="button" className="page-heading-action-btn" onClick={onAction}>
                            <i className={`bi ${actionIcon}`}></i>
                            <span>{actionLabel}</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

