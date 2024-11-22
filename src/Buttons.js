
import React from "react";
function Buttons({buttons,toggleButton}) {

    return (
        <div>
            {buttons.map((button) => {
            return <div>
                <button
                    id={button.id}
                    data-id={button.dataId}
                    disabled={button.canToggle}
                    onClick={(event) => toggleButton(event, event.target.getAttribute('data-id'))}>
                    {button.text}
                </button>
            </div>
        })}
        </div>

    )
}
export default Buttons;