/**
 * PageHeading — Shared page title block (breadcrumb tag + optional h1 + description).
 * Props:
 *   icon        {string}  Bootstrap icon class e.g. "bi-grid-1x2-fill"
 *   tag         {string}  Breadcrumb label e.g. "Dashboard"
 *   title       {string}  Optional h1 text. Omit to skip the h1.
 *   description {string}  Optional description paragraph text.
 */
export default function PageHeading({ icon, tag, title, description }) {
    return (
        <div className="page-heading-wrapper">
            <div className="page-heading-tag">
                <i className={`bi ${icon}`}></i>
                <span>{tag}</span>
            </div>
            {title && <h1 className="page-heading-title">{title}</h1>}
            {description && (
                <p className="page-heading-description">
                    Admin <i className="bi bi-arrow-right"></i> {description}
                </p>
            )}
        </div>
    );
}
