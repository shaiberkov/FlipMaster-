
import React, {useContext, useEffect, useState} from "react";
import {UserNameContext} from "./UserNameContext";
import {useNavigate} from "react-router-dom";
import Buttons from "./Buttons";
import GameResult from "./GameResult";
function Board() {
    const [counter, setCounter] = useState(0);
    const [opendButtons, setOpendButtons] = useState(0);
    const [buttons, setButtons] = useState([]);
    const [clickedButtons, setClickedButtons] = useState(0);
    const [finished, setFinished] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const {cardCount,userName,setUserName,setCardCount} =useContext(UserNameContext)
    const navigate = useNavigate();




    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(prevCounter => prevCounter + 1);
        }, 1000);
        setIntervalId(intervalId);

        return () => clearInterval(intervalId);

    }, []);
    useEffect(() => {
        if (opendButtons===parseInt(cardCount)){
            console.log("ניגמר המישחק")
            setFinished(prevState => !prevState);
            clearInterval(intervalId);



        }
    }, [opendButtons]);





    useEffect(() => {
        const newButtons = [];
        let dataIds = [];
        for (let i = 1; i <= cardCount / 2; i++) {
            dataIds.push(i, i);
        }

        dataIds = dataIds.sort(() => Math.random() - 0.5);

        for (let i = 0; i < cardCount; i++) {
            newButtons.push({
                id: i ,
                dataId: dataIds[i],
                text:"",
                canToggle:false,
            });
        }

        setButtons(newButtons);
    }, []);


    useEffect(() => {
        const checkIfTheSame=()=>{
            if (clickedButtons===2) {
                let validButtons = buttons.filter(button => button.text !== ""&&!button.canToggle);
                if (validButtons.length === 2) {
                    if (validButtons[0].text === validButtons[1].text) {
                        validButtons[0].canToggle = !validButtons[0].canToggle;
                        validButtons[1].canToggle = !validButtons[1].canToggle;
                        setOpendButtons(prevState => prevState + 2);
                    } else {
                        setButtons(prevButtons => {
                            const updatedButtons = [...prevButtons];
                            validButtons.forEach(validButton => {
                                const buttonIndex = updatedButtons.findIndex(button => button.id === validButton.id);
                                if (buttonIndex !== -1) {
                                    setTimeout(() => {
                                        setButtons(currentButtons => {
                                            const newButtons = [...currentButtons];
                                            newButtons[buttonIndex] = { ...newButtons[buttonIndex], text: "" };
                                            return newButtons;
                                        });
                                    }, 500);
                                }
                            });
                            return updatedButtons;
                        });
                    }
                }
                setClickedButtons(0);
            }
        }
        checkIfTheSame();

    },[clickedButtons])




    const toggleButton = (e, key) => {
        setButtons(prevButtons =>
            prevButtons.map(button =>
                button.id === parseInt(e.target.getAttribute("id"), 10)
                    ? { ...button, text: button.text === "" ? key  : ""}
                    : button
            )
        );


        setClickedButtons(prevState => prevState + 1);
    };

    const restartGame = () => {
        navigate('/')
        setUserName("")
        setCardCount("")

    }





    return (
        <div className="container text-center mt-4">
            <div className="mb-3">
                {finished ? (
                    <div className="alert alert-success" role="alert">
                        🏆 Game Over! Well done!
                    </div>
                ) : (
                    <div className="badge bg-info fs-4 p-3">
                        ⏱️ Time: {counter} seconds
                    </div>
                )}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Buttons buttons={buttons} toggleButton={toggleButton}/>
            </div>
            <GameResult finished={finished} userName={userName} counter={counter} restartGame={restartGame}/>
        </div>
    )
}

export default Board;