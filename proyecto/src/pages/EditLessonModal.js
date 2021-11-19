import axios from 'axios';
import React, { Component } from 'react';
import { Alert, Button, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import '../css/Global.css';
import '../css/DocenteEditLesson.css';
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";

const cookies = new Cookies();



export default class EditLessonModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            quizzOpenModal: false, quizzModalId: -1, activeButton: false, formValues: [], nameQuizz: ''
        };
    }

    componentDidMount() {
        let quizzData = JSON.parse(this.props.quizz.data)
        console.log(quizzData)
        this.setState({ formValues: quizzData, nameQuizz: this.props.quizz.name })
    }

    openModalQuizz = (id) => {
        this.setState({ quizzOpenModal: true, activeButton: false, quizzModalId: id })
    }

    closeButton = () => {
        this.setState({ activeButton: true })
    }

    closeModalQuizz = () => {
        this.setState({ quizzOpenModal: false, quizzModalId: -1 })
    }

    editLesson = (quizz) => {
        let pregunta = JSON.parse(quizz.data);
        console.log(pregunta);
        return (<Button key={pregunta[0].questionText} outline block color='primary' onClick={() => this.openModalQuizz(quizz.position)}>
            {pregunta[0].questionText}
        </Button>)
    }


    // -------------------------------------------------------------------------------- QUIZZ

    handleChangeQ = (i, e) => {
        let newFormValuesQ = [...this.state.formValues];
        newFormValuesQ[i][e.target.name] = e.target.value;
        this.setState({ formValues: (newFormValuesQ) });
    };
    handleChangeQ1 = (i, e) => {
        let newFormValuesQ = [...this.state.formValues];
        newFormValuesQ[i][e.target.name][0].answerText = e.target.value;
        this.setState({ formValues: (newFormValuesQ) });
    };
    handleChangeQ2 = (i, e) => {
        let newFormValuesQ = [...this.state.formValues];
        newFormValuesQ[i][e.target.name][1].answerText = e.target.value;
        this.setState({ formValues: (newFormValuesQ) });
    };
    handleChangeQ3 = (i, e) => {
        let newFormValuesQ = [...this.state.formValues];
        newFormValuesQ[i][e.target.name][2].answerText = e.target.value;
        this.setState({ formValues: (newFormValuesQ) });
    };

    addFormFieldsQ = () => {
        this.setState({
            formValues: [
                ...this.state.formValues,
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
        console.log(this.state.formValues);
    };

    removeFormFieldsQ = (i) => {
        let newFormValuesQ = [...this.state.formValues];
        newFormValuesQ.splice(i, 1);
        this.setState({ formValues: (newFormValuesQ) });
    };

    handleSubmitQ = async (event) => {
        event.preventDefault();
        let quizz = {
            id: this.props.quizz.id,
            sourceId: this.props.quizz.activityId,
            documentSourceType: "ACTIVITY",
            name: this.props.quizz.name,
            position: this.props.quizz.position,
            dataType: "QUIZZ",
            data: JSON.stringify(this.state.formValues),
        };
        await axios.put(API_HOST + "documents/" + cookies.get('lessonid'), quizz, { headers: { Authorization: cookies.get("token"), }, })
            .then(response => {
                alert("Quizz actualizado!");
                this.setState({ activeButton: true })
                console.log(response.data)
            }).catch(err => { console.log(err); alert("No se pudo actualizar el quizz :(") })
    };

    render() {
        console.log(this.props.quizz);
        return (
            <div key={this.props.quizz.id} >
                <div className='quizzData'>
                    <div className='nameQuizz'>
                        <Label>{this.state.nameQuizz}</Label>
                    </div>
                    <div className='quizzButton'>
                        {this.editLesson(this.props.quizz)}
                    </div>
                </div>
                <Modal isOpen={this.state.quizzOpenModal && this.state.quizzModalId === this.props.quizz.position}>
                    <ModalHeader size='lg'>
                        {this.state.nameQuizz}
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmitQ}>
                            <label> <h4>Título del quizz:</h4> </label>
                            <br />
                            <input type="text" name="nameQuizz" className="col-md-8" value={this.state.nameQuizz} maxLength="30" onChange={(n) => this.setState({ nameQuizz: (n.target.value) })} />
                            {this.state.formValues.map((element, index) => (
                                <div key={element.questionText} className="form-inline">
                                        <div>
                                            <label> <h5>Pregunta</h5> </label>
                                            <input type="text" name="questionText" value={element.questionText || ""} onChange={(e) => this.handleChangeQ(index, e)} />
                                        </div>
                                        <div>
                                            <label> <h5>Opción Correcta</h5> </label>
                                            <input type="text" name="answerOptions" placeholder="Ingrese la Opción Correcta" value={element.answerOptions[0].answerText || ""} onChange={(e) => this.handleChangeQ1(index, e)} style={{ backgroundColor: "lightskyblue" }} />
                                        </div>
                                        <div>
                                            <label> <h5>Opción Incorrecta 1</h5> </label>
                                            <input type="text" name="answerOptions" placeholder="Ingrese otra Opción" value={element.answerOptions[1].answerText || ""} onChange={(e) => this.handleChangeQ2(index, e)} />
                                        </div>
                                        <div>
                                            <label> <h5>Opción Incorrecta 2</h5> </label>
                                            <input type="text" name="answerOptions" placeholder="Ingrese otra Opción" value={element.answerOptions[2].answerText || ""} onChange={(e) => this.handleChangeQ3(index, e)} />
                                            {index ?
                                                <button type="button" className="btn btn-danger" onClick={() => this.removeFormFieldsQ(index)}>X</button>
                                                : null}
                                        </div>
                                </div>
                            ))}
                            <div className="button-section">
                                <button className="btn btn-warning" type="button" onClick={() => this.addFormFieldsQ()} >+ Pregunta</button>
                                <br />
                                <Button disabled={this.state.activeButton} color='primary' className="btn btn-primary btn-lg btn-block" type="submit" > Actualizar Actividad </Button>
                                <br />
                                <br />
                            </div>
                        </form>
                        <Alert>Aca van a ir los campos del quizz</Alert>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                        <Button color="secondary" onClick={() => this.closeModalQuizz()}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}