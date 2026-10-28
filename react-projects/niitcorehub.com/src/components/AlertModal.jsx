import { Link } from "react-router-dom";
import successImage from "../assets/icon-images/success.jpeg";
import warningImage from "../assets/icon-images/warning.jpeg";

export default function AlertModal({ ...props }) {
    const isError = props.isError || props.success === false;
    const imgSource = isError ? warningImage : (props.image || successImage);

    return (
        <div className="alert-overlay alertModal">
            <div className="alert-container">
                <div className="image-wrapper">
                    <img src={imgSource} alt={isError ? "Error" : "Success"} />
                </div>
                <h4>{props.message}</h4>
                {props.subMessage && (
                    <div className="alert-submessage">
                        {props.subMessage}
                    </div>
                )}
                {props.redirectLink ? (
                    <Link to={props.redirectLink} state={props.state}>
                        <button className="btn" type="button" title="Okay, Thanks">
                            Okay, Thanks
                        </button>
                    </Link>
                ) : (
                    <button
                        className="btn"
                        type="button"
                        title="Okay, Thanks"
                        onClick={props.onClose}
                    >
                        Okay, Thanks
                    </button>
                )}
            </div>
        </div>
    );
}
