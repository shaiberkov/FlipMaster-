
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
        console.log(typeof opendButtons, opendButtons);
        console.log(typeof cardCount, cardCount);

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
                console.log("ניכנס לאיף הראשון");
                let validButtons = buttons.filter(button => button.text !== ""&&!button.canToggle);
                // console.log(validButtons.length+"גודל1");
                // console.log(validButtons);
                if (validButtons.length === 2) {
                    // console.log("ניכנס לאיף השני");

                    if (validButtons[0].text === validButtons[1].text) {
                        // console.log("ניכנס לאיף השלישי");
                        validButtons[0].canToggle = !validButtons[0].canToggle;
                        validButtons[1].canToggle = !validButtons[1].canToggle;
                        setOpendButtons(prevState => prevState + 2);



                    } else {
                        // setButtons(prevButtons =>
                        //     prevButtons.map(button =>
                        //         validButtons.some(validButton => validButton.id === button.id)
                        //             ?  { ...button, text: "" }
                        //             : button
                        //     ))
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
        <div className="Board">

            {finished ?<div><br/></div> : <div>Time: {counter} </div>}
            <Buttons buttons={buttons} toggleButton={toggleButton} />
            <GameResult finished={finished} userName={userName} counter={counter} restartGame={restartGame} />



        </div>
    )
}

export default Board;