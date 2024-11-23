import React from "react";
function GameResult({finished,userName,counter,restartGame}) {

    return (
        <div className="container mt-4"  style={{maxWidth: '500px'}}>
            {finished && (
                <div className="card text-center shadow-lg">
                    <div className="card-header bg-success text-white">
                        🎉 Congratulations!
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {userName}, you finished the game!
                        </h5>
                        <p className="card-text">
                            You completed the game in <strong>{counter} seconds</strong>.
                        </p>
                        <button className="btn btn-primary mt-3" onClick={restartGame}>
                            🔄 Restart
                        </button>
                    </div>
                    <div className="card-footer text-muted">
                        Thank you for playing!
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameResult;