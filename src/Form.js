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
        <div>
            <form onSubmit={handleSubmit}>

                <input value={userName}
                       onChange={(e)=>setUserName(e.target.value)}
                       type="text"
                       placeholder="enter name" />
                <input value={cardCount}
                       onChange={(e)=>setCardCount(e.target.value)}
                       type="number"
                       placeholder="enter card count"
                       min="4"
                       max="30" />

                <button type="submit">Submit</button>
            </form>
        </div>


    )
}

export default Form;