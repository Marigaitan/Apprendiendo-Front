import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class DocenteProyectoQuizz extends Component {


    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            formValuesQuizz: [],
            nameQuizz: '',
        }
    }


    //------------------------CALLBACK-----------------------------------------------

    setQuizz = async (quizz) => {
        if (this.props.lessonId !== -1) {
            await axios.post(API_HOST + "lesson/" + this.props.lessonId + "/activity/template", quizz, { headers: { Authorization: cookies.get("token"), }, })
                .then(response => { alert("quizz creado correctamente"); console.log(response.data); this.setState({ formValuesQuizz: [], nameQuizz: '' }); })
                .catch(console.log)
        } else {
            console.log(this.props.lessonId)
        }
    }

    //------------------------Quizz-----------------------------------------------
    handleChangeQ = (i, e) => {
        let newFormValuesQ = [...this.state.formValuesQuizz];
        newFormValuesQ[i][e.target.name] = e.target.value;
        this.setState({ formValuesQuizz: (newFormValuesQ) });
    };
    handleChangeQ1 = (i, e) => {
        let newFormValuesQ = [...this.state.formValuesQuizz];
        newFormValuesQ[i][e.target.name][0].answerText = e.target.value;
        this.setState({ formValuesQuizz: (newFormValuesQ) });
    };
    handleChangeQ2 = (i, e) => {
        let newFormValuesQ = [...this.state.formValuesQuizz];
        newFormValuesQ[i][e.target.name][1].answerText = e.target.value;
        this.setState({ formValuesQuizz: (newFormValuesQ) });
    };
    handleChangeQ3 = (i, e) => {
        let newFormValuesQ = [...this.state.formValuesQuizz];
        newFormValuesQ[i][e.target.name][2].answerText = e.target.value;
        this.setState({ formValuesQuizz: (newFormValuesQ) });
    };

    addFormFieldsQ = () => {
        this.setState({
            formValuesQuizz: [
                ...this.state.formValuesQuizz,
                {
                    questionText: "",
                    answerOptions: [
                        { answerText: "", isCorrect: true },
                        { answerText: "", isCorrect: false },
                        { answerText: "", isCorrect: false },
                    ],
                },
            ]
        });
    };

    removeFormFieldsQ = (i) => {
        let newFormValuesQ = [...this.state.formValuesQuizz];
        newFormValuesQ.splice(i, 1);
        this.setState({ formValuesQuizz: (newFormValuesQ) });
    };

    handleSubmitQ = (event) => {
        event.preventDefault();
        let quizz = {
            id: null,
            name: null,
            description: null,
            position: null,
            dueDate: null,
            startDate: null,
            rewards: null,
            documents: [
                {
                    activityId: null,
                    name: this.state.nameQuizz,
                    position: 0,
                    dataType: "QUIZZ",
                    data: JSON.stringify(this.state.formValuesQuizz),
                },
            ],
        }
        this.setQuizz(quizz);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmitQ}>
                <label> <h4>Título</h4> </label>
                <br />
                <input type="text" name="nameQuizz" className="col-md-8" value={this.state.nameQuizz || ""} placeholder="Ingrese el título de la actividad" maxLength="30" onChange={(n) => this.setState({ nameQuizz: (n.target.value) })} />
                {this.state.formValuesQuizz.map((element, index) => (
                    <div className="form-inline" key={index}>
                        <div>
                            <label> <h5>Pregunta</h5> </label>
                            <input type="text" name="questionText" value={element.questionText || ""} onChange={(e) => this.handleChangeQ(index, e)} />
                            <label> <h5>Opción Correcta</h5> </label>
                            <input type="text" name="answerOptions" placeholder="Ingrese la Opción Correcta" value={element.answerOptions[0].answerText || ""} onChange={(e) => this.handleChangeQ1(index, e)} style={{ backgroundColor: "lightskyblue" }} />
                        </div>
                        <div>
                            <label> <h5>Opción Incorrecta 1</h5> </label>
                            <input type="text" name="answerOptions" placeholder="Ingrese otra Opción" value={element.answerOptions[1].answerText || ""} onChange={(e) => this.handleChangeQ2(index, e)} />
                            <label> <h5>Opción Incorrecta 2</h5> </label>
                            <input type="text" name="answerOptions" placeholder="Ingrese otra Opción" value={element.answerOptions[2].answerText || ""} onChange={(e) => this.handleChangeQ3(index, e)} />
                            {index ?
                                <button type="button" className="btn btn-danger" onClick={() => this.removeFormFieldsQ(index)}>X</button>
                                : null}
                        </div>
                    </div>
                ))}
                <div className="button-section">
                    <button
                        className="btn btn-warning"
                        type="button"
                        onClick={() => this.addFormFieldsQ()}
                    >
                        + Pregunta
                    </button>
                    <br />
                    <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                    >
                        Guardar Actividad
                    </button>
                    <br />
                    <br />
                </div>
            </form>
        )
    }
}