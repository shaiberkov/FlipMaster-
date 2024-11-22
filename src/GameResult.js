import React from "react";
function GameResult({finished,userName,counter,restartGame}) {

    return (
        <div>
            {finished && <label>
                hey {userName} you finished the game in {counter} seconds
                <br/>
                <button onClick={restartGame}>restart</button>
            </label>}
        </div>
    )
}
export default GameResult;