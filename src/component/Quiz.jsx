import { useState , useCallback } from "react";
import QUISTIONS from "../../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";



export default function Quiz() {


    // const [activeQuestionIndex, setActiveQuestionIndex ] = useState(0);
    // const [answers, setAnswers] = useState([]);
    // tracing the current active question and the answers by the state hooks it is the not 
    // optimal way to do it
    // lesson 193


    //lesson 194  download the questions.js from this lesson resource
    // the optimal way to do it
    const [answers, setAnswers] = useState([]);

    // lesson 199 adding new state
    //const [answerState, setAnswerState] = useState(''); commented in lesson 201
    //const activeQuestionIndex = answerState === '' ? answers.length : answers.length -1 ; changed in lesson 201
    const activeQuestionIndex = answers.length  ;
    const isQuizFinished = activeQuestionIndex === QUISTIONS.length;
     // deriving the active question from the answers array (only one state) 
    // this is a comuted value     

    // lesson 197 adding the useCallback hook
    // handelClick is a callback function with no dependencies
    // no dependencies because handelClick is a pure function
    // does not depend on the state
 
     const handelClick =  useCallback( function handelClick(selectedAnswer) {
        //  setAnswerState('answered'); commented in lesson 201
        
 
         setAnswers( (prevQuestions) => {
             return [...prevQuestions, selectedAnswer]
             });
 
         // this is a nested timeout the nessted will be excuted after 1 second 
         //means after the first timeout
         // lesson 199
        // setTimeout(() => {
 
        //      if (selectedAnswer === QUISTIONS[activeQuestionIndex].answers[0]) {
        //          setAnswerState('correct');
                 
        //      }
        //      else {
        //          setAnswerState('wrong');
        //      }
 
        //      setTimeout(()=>
        //      {
        //          setAnswerState('');
        //      }
        //      , 2000);
        //  },
        //  1000); commented in lesson 201
     }, 
     [], // dependency changed in lesson 201 
     // lesson 199 we sitting the dependency on the activeQuestionIndex because it is changing when the user click the next button
 )
      // lesson 197
     // handelSkipQuestion uses after the timeout to get the next question
     // so handelSkipQuestion depends on handelClick  to get the next question
     // so the handelClick is dependacy for the handelSkipQuestion
     
     const handelSkipQuestion = useCallback(()=> handelClick(null), [handelClick]);
       // in lesson 197  after adding these callBack function 
       // after the timeout the handelClick will be called and provide 
       // the next question then wil stop  even though 
       // the time of the next question is  over
       // when the dependency change the handelClick will be called again because of the dependency change when the 
       //Quiz gets re-rendered , it will prvide the same function (handelClick)  but it will be handeled as a new function because this is
       // how js works means the dependency change , so useCallback will help us to avoid this problem 
       
 
 
       // the most importent note in the lesson 197
       // the key prop in Progressbar can be used to new perpous
       // the Progressbar dosnot re-render if the state gets change it will still as is
       // means it will not be unamounted and we need to unamount  then reamount this component
       // key  can help us to do that : Progressbar key={activeQuestionIndex}
       //  activeQuestionIndex will be change so that means the Progressbar component will be
       // re-render again 
       


    //lesson 195 shufull the questions

    
      if (isQuizFinished) {
        return (
            <Summary answers={answers} />
        )
      }
      

    // this array shuffling should be done afrer the if statement 
    // because the array will access at index outbound the array 

    // const shuffledAnswers = [...QUISTIONS[activeQuestionIndex].answers];
    // shuffledAnswers.sort(() => Math.random() - 0.5); this code was commented in lesson 200 go to Ansewers.jsx
     // generate a random order from  -0.5 to 0.5
    // if the number is positive then the array will be shuffled in the ascending order
    // if the number is negative then the array will be shuffled in the descending order
    
    

// adding key={activeQuestionIndex} to re-render the component when the activeQuestionIndex changes

   
    return (

        <div id="quiz">
            <Question
            key={activeQuestionIndex}
            index={activeQuestionIndex} 
               onAnswer={handelClick} 
               onTimeOut={handelSkipQuestion} 
            />
        </div>
    );
}