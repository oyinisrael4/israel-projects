export default function ButtonComponent({ ...props }) {
    return (
        <button
            className={`btn ${props.className || "login-submit-btn"}`}
            type={props.buttonType || "button"}
            onClick={props.action}
            disabled={props.btnAction}
            title={props.buttonTitle}
        >
            {props.buttonText}
        </button>
    );
}
