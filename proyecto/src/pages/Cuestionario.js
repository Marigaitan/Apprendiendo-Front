import React, { useState } from "react";
import "../css/Quizz.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Cuestionario = React.memo(({ handleAnswers, work }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState();

  // const submit = () => {
  //   confirmAlert({
  //     title: "Error",
  //     message: "La respuesta no puede estar vacia",
  //     buttons: [
  //       {
  //         label: "OK",
  //         onClick: () => alert("Click Yes"),
  //       },
  //     ],
  //   });
  // };

  const answerCuest = (n) => setAnswer(n);

  const handleAnswerButtonClick = () => {
    if (!!answer) {
      setScore(score + 1);
      const nextQuestion = currentQuestion + 1;
      setAnswers(answers.concat(answer));

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
      setAnswer("");
    } else alert("La respuesta no puede estar vacia");
  };

  // const questions = [
  //   { question: "What is the capital of France?" },
  //   { question: "Who is CEO of Tesla?" },
  //   { question: "The iPhone was created by which company" },
  //   { question: "How many Harry Potter books are there" },
  // ];

  const questions = JSON.parse(work.data);
  handleAnswers(answers);
  return (
    <div classname="quizzBack">
      <div className="appQuizz">
        {showScore ? (
          <div className="score-section">
            ¡Muy Bien! ¡Contestaste {score} de {questions.length} preguntas!
          </div>
        ) : (
          <div>
            <div className="question-section">
              <div className="question-count">
                <span>Pregunta {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              <textarea
                className="col-md-10"
                value={answer}
                rows="4"
                name="answer"
                placeholder="Ingrese su respuesta"
                onChange={(a) => answerCuest(a.target.value)}
              />

              <button
                classname="QuizzButton"
                onClick={() => handleAnswerButtonClick()}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Cuestionario;
