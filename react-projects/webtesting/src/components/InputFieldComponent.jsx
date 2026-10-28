
export default function InputField({ ...props }) {
    return (
        <>
            <div className="input-wrapper">
                <label>{props.title}:</label>
                <input
                    type={props.inputType}
                    id={props.id}
                    name={props.name}
                    placeholder={props.placeHolder}
                    className="text-field"
                    onChange={props.handleChangeValue}
                    value={props.inputValue}

                />
                <span className="error">{props.error ? props.error: ''}</span>

            </div>
        </>
    )
}