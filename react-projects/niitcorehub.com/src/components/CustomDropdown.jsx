import { useState, useRef, useEffect } from "react";

/**
 * CustomDropdown — A modern, accessible custom dropdown component
 *
 * Props:
 *   icon        {string}    Bootstrap icon class e.g. "bi-funnel" or "bi-toggle2-on"
 *   value       {string}    Current selected value
 *   onChange    {function}  Called with { target: { value } }
 *   options     {Array}     [{ value, label }] or string array
 *   placeholder {string}    Optional placeholder
 *   minWidth    {string}    Optional min-width (default "150px")
 */
export default function CustomDropdown({
    icon,
    value,
    onChange,
    options = [],
    placeholder = "Select...",
    minWidth = "150px",
    id,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Normalize options into [{ value, label }]
    const normalizedOptions = options.map((opt) =>
        typeof opt === "object" && opt !== null
            ? opt
            : { value: opt, label: opt === "all" ? "All" : opt }
    );

    const currentOption = normalizedOptions.find((opt) => opt.value === value) || {
        value,
        label: placeholder,
    };

    // Close on outside click or escape
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        function handleKeyDown(e) {
            if (e.key === "Escape") setIsOpen(false);
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    function handleSelect(val) {
        if (onChange) {
            onChange({ target: { value: val } });
        }
        setIsOpen(false);
    }

    return (
        <div
            className={`custom-dropdown-container${isOpen ? " dropdown-open" : ""}`}
            ref={dropdownRef}
            id={id}
            style={{ minWidth }}
        >
            <button
                type="button"
                className="custom-dropdown-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {icon && <i className={`bi ${icon} custom-dropdown-icon`}></i>}
                <span className="custom-dropdown-label">{currentOption.label}</span>
                <i className={`bi bi-chevron-down custom-dropdown-chevron${isOpen ? " chevron-rotated" : ""}`}></i>
            </button>

            {isOpen && (
                <div className="custom-dropdown-menu" role="listbox">
                    {normalizedOptions.map((opt) => {
                        const isSelected = opt.value === value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                className={`custom-dropdown-item${isSelected ? " item-selected" : ""}`}
                                onClick={() => handleSelect(opt.value)}
                                role="option"
                                aria-selected={isSelected}
                            >
                                <span>{opt.label}</span>
                                {isSelected && <i className="bi bi-check2 custom-dropdown-check"></i>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
