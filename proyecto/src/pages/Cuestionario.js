import React, { useState } from 'react';
import '../css/Quizz.css'

export default function Cuestionario() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    
    
    const answerCuest = n => {
        let answer = n;
        setAnswers(answers.concat(answer));
        
    }
	const handleAnswerButtonClick = () => {		
		setScore(score + 1);		
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
        console.log(answers);
	};
	const questions = [
		{question: 'What is the capital of France?'},
        {question: 'Who is CEO of Tesla?'},
        {question: 'The iPhone was created by which company'},
        {question: 'How many Harry Potter books are there'},	
	];

	return (
		<div classname='quizzBack'>
			<div className='appQuizz'>

				{showScore ? (
					<div className='score-section'>Contestaste {score} de {questions.length} preguntas</div>
				) : (
					<div>
						<div className='question-section'>
							<div className='question-count'>
								<span>Pregunta {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='question-text'>{questions[currentQuestion].question}</div>
						</div>
						<div className='answer-section'>
                            <textarea className="col-md-10" rows="4" placeholder="Ingrese su respuesta" onChange={(a) => answerCuest(a.target.value)} />
							
								<button classname='QuizzButton' onClick={() => handleAnswerButtonClick()}>Siguiente</button>
							
						</div>
					</div>
				)}
			</div>
		</div>
	);
}