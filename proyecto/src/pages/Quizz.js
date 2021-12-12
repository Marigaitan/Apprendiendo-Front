import React, { useEffect, useState } from "react";
import "../css/Quizz.css";


const Quizz = React.memo(({ handleQuizz, workquizz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [respuestas, setrespuestas] = useState({
    puntaje: 0,
    resultados: [],
  });
  const { puntaje, resultados } = respuestas;
  const questions = JSON.parse(workquizz.data);

   //------------------random Options ---------------------------
   useEffect(() => {
    
    for (let n=0; n < questions.length; n++) {
      let options = questions[n].answerOptions;
              let i = options.length - 1;
              for (; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = options[i];
                options[i] = options[j];
                options[j] = temp;
                questions[n].answerOptions = options;
              }
              
            }
            console.log("estructura random");
            console.log(questions);
            return questions;
          });

  const handleAnswerButtonClick = (isCorrect, questionText, answerText) => {
    let aux = {
      pregunta: questionText,
      respuesta: answerText,
    };

    if (isCorrect) {
      setScore((e) => e + 1);
      //setrespuestas({ ...respuestas, puntaje: puntaje + 1 });
    }
    setrespuestas({
      ...respuestas,
      puntaje: puntaje + score,
      resultados: resultados.concat(aux),
    });
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };


  handleQuizz(respuestas, score);


  //console.log("ESTRUCTURA:", respuestas);
  return (
    <div classname="quizzBack">
      <div className="appQuizz">
        {showScore ? (
          <div className="score-section">
            ¡Acertaste {score} de {questions.length} preguntas!
          </div>
        ) : (
          <div>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    className="QuizzButton"
                    onClick={() =>
                      handleAnswerButtonClick(
                        answerOption.isCorrect,
                        questions[currentQuestion].questionText,
                        answerOption.answerText
                      )
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
export default Quizz;
