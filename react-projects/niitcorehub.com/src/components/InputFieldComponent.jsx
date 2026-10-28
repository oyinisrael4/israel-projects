export default function InputField({ ...props }) {
    const hasError = Boolean(props.error);

    return (
        <div className="login-input-wrapper input-wrapper">
            {props.title && <label htmlFor={props.id}>{props.title}</label>}
            <input
                type={props.inputType || "text"}
                id={props.id}
                name={props.name}
                placeholder={props.placeHolder}
                className={`text-field ${hasError ? "input-error" : ""}`}
                onChange={props.handleChangeValue}
                value={props.inputValue}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                aria-invalid={hasError}
            />
            {hasError && (
                <span className="login-input-error-msg" role="alert">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <span>{props.error}</span>
                </span>
            )}
        </div>
    );
}
