import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserNameContext} from "./UserNameContext";
function Form(){
    const {userName,setUserName,cardCount, setCardCount} = useContext(UserNameContext);
    const navigate = useNavigate();



    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userName || !cardCount) {
            alert("אנא מלא את כל השדות");
        }
        else if(parseInt(cardCount)%2!==0){
            console.log(typeof cardCount,cardCount)
            alert("כמות הקלפים צריכה להיות זוגית");
        }
        else {
            navigate('/board');
        }

    };

    return (
        <div className="container mt-4">
            <form className="p-4 border rounded shadow-sm bg-light mx-auto" onSubmit={handleSubmit}
                  style={{maxWidth: '500px'}}>
                <h3 className="text-center mb-4">🎯 Start the Game</h3>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cardCount" className="form-label">Number of Cards</label>
                    <input
                        id="cardCount"
                        value={cardCount}
                        onChange={(e) => setCardCount(e.target.value)}
                        type="number"
                        className="form-control"
                        placeholder="Enter number of cards (4-30)"
                        min="4"
                        max="30"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">🎮 Start</button>
            </form>
        </div>


    )
}

export default Form;