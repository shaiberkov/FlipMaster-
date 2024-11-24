import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Buttons({ buttons, toggleButton }) {
    return (
        <div
            className="d-flex flex-wrap justify-content-center align-items-center gap-2 p-3"
            style={{
                maxWidth: '440px',
                backgroundColor: "black",
                borderRadius: "10px",
                display: "inline-flex",
                padding: "10px",
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
            }}
        >
            {buttons.map((button) => (
                <button
                    id={button.id}
                    data-id={button.dataId}
                    disabled={false}
                    onClick={(e) => toggleButton(e)}
                    className="btn btn-primary"
                    style={{
                        width: "60px",
                        height: "60px",
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}
                >
                </button>
            ))}
        </div>
    );
}

export default Buttons;

