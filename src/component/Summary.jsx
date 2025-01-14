import quizeComplete from "../../src/assets/quiz-complete.png";
import QUISTIONS from "../../questions.js";


export default function Summary({answers}) {
    const skipped = answers.filter((answer) => answer === null);
    const correct = answers.filter((answer , index) => answer === QUISTIONS[index].answers[0]);
    const inCorrect = answers.filter((answer , index) => answer !== QUISTIONS[index].answers[0] && answer !== null);
    const skippedPercentage = (skipped.length / answers.length) * 100;
    const correctPercentage = (correct.length / answers.length) * 100;
    const inCorrectPercentage = (inCorrect.length / answers.length) * 100;
    return (
        <div id="summary">
            <img src={quizeComplete} alt="quiz complete" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedPercentage.toFixed(0)}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctPercentage.toFixed(0)}%</span>
                    <span className="text">answerd correctly</span>
                </p>
                <p>
                    <span className="number">{inCorrectPercentage.toFixed(0)}%</span>
                    <span className="text">answerd icorrectly</span>
                </p>

        </div>
            <ol>
                {answers.map((answer , index) =>{
                    let  cssClass = "user-answer";
                    if (answer === QUISTIONS[index].answers[0]){
                        cssClass = "user-answer correct";
                    }
                    if (answer === null){
                        cssClass = "user-answer skipped";
                    }
                    if (answer !== QUISTIONS[index].answers[0] && answer !== null){
                        cssClass = "user-answer wrong";
                    }
                  return(
                <li key={index} >
                    {/* using the index as a key because null answers could be occurring more than once */}
                        <h3>{index + 1}</h3>
                        <p className="question">{QUISTIONS[index].text}</p>
                        <p className={cssClass}>{answer ?? 'Skipped'}</p>
                </li>   
                  )  
              })}
            </ol>   
        </div>
    );
}