import QUISTIONS from "../../questions.js";
import Ansewers from "./Ansewers.jsx";
import Progressbar from "./ProgresessBar.jsx";
import { useState } from "react";
export default function Question({
    index,
    onAnswer,
    onTimeOut,

}) {

    
      const [answer, setSelectedAnswer ] = useState(
        {selectedAnswer: '',
        isCorrect: null,
    })

    let timer = 10000;  // default value for the time required to answer the question

    if (answer.selectedAnswer) {
        timer = 1000; // time to review the answer 
    }
    if (answer.isCorrect !== null) {
        timer = 2000; // time to move to the next question
    }
    // use the computed timer as default value for the progress bar


    function selectHandler(answer) {
        setSelectedAnswer({
            selectedAnswer: answer,
            isCorrect:null,
        })
        setTimeout(() => {
            setSelectedAnswer({
                selectedAnswer: answer,
                isCorrect: answer === QUISTIONS[index].answers[0],
            })

            setTimeout(() => {
                onAnswer(answer)
            } , 2000)
            
        }, 1000);
    }
    let answerState =''

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    }
    else if (answer.selectedAnswer ) {
        answerState = 'answered'
    }

    return (
        <div id="question">
            <Progressbar
            key={timer }
            onTimeOut={answer.selectedAnswer === '' ?  onTimeOut : null} 
            timeOut={timer}
            mode={answerState}
            activeQuestionindex={index}
            />
            <h1>{QUISTIONS[index].text}</h1>
            <Ansewers
            answers={QUISTIONS[index].answers} 
            onAnswer={selectHandler} 
            answerState={answerState}
            selectedAnswer={answer.selectedAnswer}
            />
            </div>
    )
}