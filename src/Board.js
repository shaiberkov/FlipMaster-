
import React, {useContext, useEffect, useState} from "react";
import {UserNameContext} from "./UserNameContext";
import {useNavigate} from "react-router-dom";
import Buttons from "./Buttons";
import GameResult from "./GameResult";
function Board() {
    const [counter, setCounter] = useState(0);
    const [opendButtons, setOpendButtons] = useState(0);
    const [buttons, setButtons] = useState([]);
    const [buttonEvents,setButtonEvents]=useState([])
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
            setFinished(prevState => !prevState);
            clearInterval(intervalId);



        }
    }, [opendButtons]);




    useEffect(()=>{
        const buttonsArr=[];
        let dataId=[];
        for(let i=0;i<cardCount/2;i++){
            dataId.push(i+1,i+1);
        }
        dataId =dataId.sort(()=>Math.random() - 0.5);

        for(let i=0;i<cardCount;i++){
            buttonsArr.push({
                    id: i,
                    dataId:dataId[i],
                }

            );
        }
        setButtons(buttonsArr);

    },[])
    useEffect(()=>{
        const check=()=>{
            if(buttonEvents.length ===2) {
                if(buttonEvents[0].id!==buttonEvents[1].id){
                    if (buttonEvents[0].innerText.trim()===buttonEvents[1].innerText.trim()){
                        buttonEvents[0].disabled=!buttonEvents[0].disabled;
                        buttonEvents[1].disabled=!buttonEvents[1].disabled;
                        setOpendButtons(prevState => prevState + 2);
                    }
                    else {
                        setTimeout(() => {
                            buttonEvents[0].innerText = null;
                            buttonEvents[1].innerText = null;
                        }, 500);

                    }
                }
                setButtonEvents([]);

                }

        }
        check();


    },[buttonEvents])




        const toggleButton = (e) => {
        const button = e.target;
        if(button.innerText.trim()===""){
            const newText = button.dataset.id;
            button.innerText= newText ;
        }
        else {
            button.innerText=null;
        }
        setButtonEvents(prevState => [...prevState, button]);
    }

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
