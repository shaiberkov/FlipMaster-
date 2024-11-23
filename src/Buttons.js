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
                display: "inline-flex", // מאפשר שימוש ב-flexbox, משאיר את הכפתורים בתוך ה-500px
                padding: "10px",
                justifyContent: 'space-evenly', // הכפתורים יתפזרו בצורה שווה
                flexWrap: 'wrap', // מאפשר לכפתורים לעבור שורה אם יש יותר מדי
            }}
        >
            {buttons.map((button) => (
                <button
                    key={button.id}
                    id={button.id}
                    data-id={button.dataId}
                    disabled={button.canToggle}
                    onClick={(event) => toggleButton(event, event.target.getAttribute('data-id'))}
                    className="btn btn-primary"
                    style={{
                        width: "60px",
                        height: "60px",
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}
                >
                    {button.text}
                </button>
            ))}
        </div>

        // <div
        //     className="d-flex flex-wrap justify-content-center align-items-center gap-2 p-3"
        //     style={{
        //         maxWidth: '500px',
        //         backgroundColor: "black",
        //         borderRadius: "10px",
        //         display: "inline-block",
        //         padding: "10px",
        //     }}
        // >
        //     {buttons.map((button) => (
        //         <button
        //             key={button.id}
        //             id={button.id}
        //             data-id={button.dataId}
        //             disabled={button.canToggle}
        //             onClick={(event) => toggleButton(event, event.target.getAttribute('data-id'))}
        //             className="btn btn-primary"
        //             style={{
        //                 width: "60px",
        //                 height: "60px",
        //                 fontSize: "18px",
        //                 fontWeight: "bold",
        //             }}
        //         >
        //             {button.text}
        //         </button>
        //     ))}
        //  </div>
    );
}

export default Buttons;

