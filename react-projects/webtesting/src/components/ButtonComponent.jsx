
export default function ButtonComponent({ ...props }) {
    return (
        <>
            <button
                className={`btn ${props.className}`}
                type={props.buttonType}
                onClick={props.action}
                disabled= {props.btnAction}
                title={props.buttonTitle}>
                {props.buttonText}
                </button>

        </>
    )
}