// lesson 200  adding new component 


import { useRef } from "react";
export default function Ansewers({answers, onAnswer , answerState , selectedAnswer}) {
    // using the useRef hook to store the shuffled answers and prevent the component from re-rendering
const shuffledAnswers = useRef();
     if (!shuffledAnswers.current) {
         shuffledAnswers.current = [...answers];
             shuffledAnswers.current.sort(() => Math.random() - 0.5);
     }

    
    return (
        <ul id="answers">
        {shuffledAnswers.current.map((answer) => {

            const isSelected = selectedAnswer === answer;
              let cssClass = '';
              if (answerState === 'answered' && isSelected) {
                cssClass = 'selected';
              }
               if ((answerState === 'wrong' || answerState === 'correct') && isSelected)  {
                cssClass = answerState
              }
            return(

            <li key={answer} className="answer">
                <button onClick={() => onAnswer(answer)} className={cssClass} disabled={answerState === 'answered'}>{answer}</button>
            </li>
            )
        })}
        
    </ul>
    )
}