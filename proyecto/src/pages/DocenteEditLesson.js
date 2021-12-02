import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/DocenteEditLesson.css';
import Cookies from "universal-cookie/es6";
import * as _ from "lodash";
import HeaderTeacher from './Header';
import axios from 'axios';
import { API_HOST } from "../constants";
import { Alert, Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EditLessonModal from "./EditLessonModal";
const cookies = new Cookies();

export default class DocenteEditLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            archivos: [], nameCuest: '', formValuesCuest: [], lesson: undefined,
            actividades: [], cuestionarios: [], quizzes: [],
            quizzOpenModal: false, quizzModalId: -1, quizzUpdate: undefined, activeButton: false,
            nameQuizz: '', formValuesQuizz: [],
        };
    }


    // --------------------------------------------------------------------------------------------- MODAL

    // openModalQuizz = (id) => {
    //     this.setState({ quizzOpenModal: true, activeButton: false, quizzModalId: id })
    // }

    // closeButton = () => {
    //     this.setState({ activeButton: true })
    // }

    // closeModalQuizz = () => {
    //     this.setState({ quizzOpenModal: false, quizzModalId: -1 })
    // }

    //--------------------------------------------------------------------------------------------- DATOS

    async componentDidMount() {
        await axios.get(API_HOST + "lesson/" + cookies.get('lessonid'), { headers: { 'Authorization': cookies.get('token') } })
            .then(async response => {
                console.log(response.data);
                const archivos = response.data.documents === null ? [] : response.data.documents.filter(document => document.dataType === 'FILE')
                const actividades = response.data.activities === null ? [] : response.data.activities
                const actDocuments = await this.getActivityDocs(actividades);
                console.log(actDocuments);
                const cuestionarios = actDocuments.filter(
                    actDocument => actDocument !== undefined && actDocument && actDocument.dataType === "CUESTIONARIO"
                );
                const quizzes = actDocuments.filter(
                    actDocument => actDocument !== undefined && actDocument && actDocument.dataType === "QUIZZ"
                );
                console.log(cuestionarios)
                console.log(quizzes)
                this.setState({
                    lesson: response.data,
                    archivos: archivos,
                    actividades: actividades,
                    cuestionarios: cuestionarios,
                    quizzes: quizzes,
                });
            })
    }

    async getActivityDocs(activities) {
        return Promise.all(activities.map(async activity => {
            const activityData = (await axios.get("activity/" + activity.id)).data
            console.log(activityData);
            return (activityData.documents === null || activityData.documents === undefined || activityData.documents.length === 0)
                ? undefined
                :
                {
                    id: activityData.documents[0].id,
                    name: activityData.documents[0].name,
                    position: activityData.documents[0].position,
                    dataType: activityData.documents[0].dataType,
                    data: activityData.documents[0].data,
                    activityId: activity.id,
                }
        }))
    }



    

    //--------------------------------------------------------------------------------------------- FILE
    subirArchivos = async elem => {
        console.log('imprimiendo elem')
        console.log(elem);
        const base64 = await this.convertToBase64(elem[0]);
        console.log('imprimiendo base64')
        console.log(base64);
        let archivo = {
            name: elem[0].name,
            position: this.state.archivos.position,
            dataType: 'FILE',
            data: base64,
            documentSourceType: 'LESSON',
            sourceId: cookies.get('lessonid'),
        }
        await axios.post(API_HOST + "document", archivo,{ headers: { Authorization: cookies.get("token"), }, }).then(response => archivo.id = response.data).catch(console.log);
        this.setState(prevState => ({ archivos: prevState.archivos.concat(archivo) }));
    }

    convertToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    borrarArchivo = async (e) => {
        let document = _.find(this.state.archivos, {name: e.name});
        console.log(document);
        await axios.delete(API_HOST + "document/" + document.id + "/source/" + document.sourceId, { headers: { Authorization: cookies.get("token"), }, }).catch(console.log);
        this.setState(prevState => ({ archivos: prevState.archivos.filter(archivo => archivo.name !== e.name) }));
    }

    //--------------------------------------------------------------------------------------------- CUESTIONARIO
    handleChangeC = (i, e) => {
        let newFormValuesCuest = [...this.state.formValuesCuest];
        newFormValuesCuest[i][e.target.name] = e.target.value;
        this.setState({ newFormValuesCuest: newFormValuesCuest });
    }

    addFormFieldsC = () => {
        this.setState(prevState => ({ formValuesCuest: [...prevState.formValuesCuest, { question: "" }] }))
        console.log(this.state.formValuesCuest)
    }

    removeFormFieldsC = (i) => {
        let newFormValuesCuest = [...this.state.formValuesCuest];
        newFormValuesCuest.splice(i, 1);
        this.setState({ newFormValuesCuest: newFormValuesCuest });
    }

    handleSubmitC = async (event) => {
        event.preventDefault();
        alert("Agregaste un nuevo cuestionario!");
        let cuestionario = {
            id: null,
            name: null,
            description: null,
            position: null,
            dueDate: null,
            startDate: null,
            rewards: null,
            lessonId: parseInt(cookies.get('lessonid'), 10),
            documents: [{
                activityId: null,
                name: this.state.nameCuest,
                position: this.state.cuestionarios.length,
                dataType: "CUESTIONARIO",
                data: JSON.stringify(this.state.formValuesCuest)
            }]
        }
        await axios.post(API_HOST + "lesson/" + cookies.get('lessonid') + "/activity/template", cuestionario, { headers: { Authorization: cookies.get("token"), }, })
            .then(response => {
                cuestionario.id = parseInt(response.data, 10)
                cuestionario.documents[0].activityId = parseInt(response.data, 10)
                this.setState(prevState => (
                    {
                        actividades: prevState.actividades.concat(cuestionario),
                        cuestionarios: prevState.cuestionarios.concat(cuestionario.documents[0]),
                    }
                ));
                alert("guardaste el cuestionario yay");
                window.location.reload(false);
            })
        console.log(this.state.actividades);
        console.log(this.state.cuestionarios);
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

    handleSubmitQ = async (event) => {
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
                    position: this.state.quizzes.length,
                    dataType: "QUIZZ",
                    data: JSON.stringify(this.state.formValuesQuizz),
                },
            ],
        };
        await axios.post(API_HOST + "lesson/" + cookies.get('lessonid') + "/activity/template", quizz, { headers: { Authorization: cookies.get("token"), }, })
            .then(response => {
                quizz.id = parseInt(response.data, 10)
                quizz.documents[0].activityId = parseInt(response.data, 10)
                this.setState(prevState => (
                    {
                        actividades: prevState.actividades.concat(quizz),
                        quizzes: prevState.quizzes.concat(quizz.documents[0]),
                    }
                ));
                alert("Agregaste un nuevo Quizz!");
                window.location.reload(false);
            }).catch(err => { console.log(err); alert("No se pudo agregar el quizz :(") })
        console.log(this.state.actividades);
        console.log(this.state.quizzes);
    };

    updateQuizz = async () => {
        this.closeButton();
        alert("guardaste el quizz yay");
        console.log(this.state.quizzUpdate);
    }

    editLesson = (quizz) => {
        let pregunta = JSON.parse(quizz.data);
        console.log(pregunta);
        return (<Button key={pregunta[0].questionText} outline block color='primary' onClick={() => this.openModalQuizz(quizz.position)}>
            {pregunta[0].questionText}
        </Button>)
    }

    //--------------------------------------------------------------------------------------------- RENDER

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='newClaseForm'>
                    {/* aca va el nombre de la clase */}
                    <div className='whiteBox'>
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.name}</Label></h1>}
                        </div>
                        {/* aca va el enunciado */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.description}</Label></h1>}
                        </div>
                    </div>

                    {/* //-----------------------Files------------------------------------------------ */}
                    {/* aca se deben ver los archivos cargados */}
                    {/* luego dar la opcion de cargar uno */}
                    <div className='boxActiv'>
                        <div className='newFile'>
                            <label><h4>Material Cargado</h4></label><br />
                            <Input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files)} />
                            <br />
                            {this.state.archivos && this.state.archivos.map(document =>
                                <div key={document.name} >
                                    <Alert className="flexSpaceBetween">
                                        <Label>{document.name}</Label>
                                        <Button name={document.name} onClick={() => this.borrarArchivo(document)}>Borrar</Button>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <br />

                        {/* //---------------------Cuestionario------------------------------------------ */}
                        {/* aca se deben ver los cuestionarios cargados */}
                        {/* luego dar la opcion de cargar uno */}

                        <div className='setCuestionario'>
                            <div className='editQuizz'>
                                <Label><h4>Cuestionarios activos:</h4></Label>
                                {this.state.cuestionarios.map(cuestionario => {
                                    console.log(cuestionario);
                                    return (
                                        <div key={cuestionario.id} >
                                            <EditLessonModal cuestionario={cuestionario} />
                                        </div>
                                    )
                                })}
                            </div>
                            <br />
                            <div>
                                <label><h4>Agregar Cuestionario</h4></label><br />
                                <form onSubmit={this.handleSubmitC}>
                                    <label><h4>Título</h4></label><br />
                                    <input type="text" name="nameCuest" className="col-md-8" placeholder="Ingrese el título de la actividad" maxLength="30" onChange={(n) => { this.setState({ nameCuest: n.target.value }) }} />
                                    {this.state.formValuesCuest.map((element, index) => (
                                        <div className="form-inline" key={index}>
                                            <label><h5>Pregunta: </h5></label>
                                            <input type="text" name="question" value={element.question || ""} onChange={e => this.handleChangeC(index, e)} />
                                            {
                                                index ?
                                                    <button type="button" className="btn btn-danger" onClick={() => this.removeFormFieldsC(index)}>X</button>
                                                    : null
                                            }
                                        </div>
                                    ))}
                                    <div className="button-section">
                                        <button className="btn btn-warning" type="button" onClick={() => this.addFormFieldsC()}>+ Pregunta</button><br />
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Crear Actividad</button><br /><br />
                                    </div>
                                </form>
                            </div>
                        </div>


                        {/* ---------------------------------------Quizz--------------------------------------- */}
                        {/* aca se deben ver los quizz cargados */}
                        {/* luego dar la opcion de cargar uno */}


                        <div className='setQuizz'>
                            <div className='editQuizz'>
                                <Label><h4>Quizzes activos:</h4></Label>
                                {this.state.quizzes.map(quizz => {
                                    console.log(quizz);
                                    return (
                                        <div key={quizz.id} >
                                            <EditLessonModal quizz={quizz} />
                                        </div>
                                    )
                                })}
                            </div>
                            <br />
                            <label>
                                <h4>Agregar Ejercicio de Selección Múltiple</h4>
                            </label>
                            <br />
                            <form onSubmit={this.handleSubmitQ}>
                                <label> <h4>Título</h4> </label>
                                <br />
                                <input type="text" name="nameQuizz" className="col-md-8" placeholder="Ingrese el título de la actividad" maxLength="30" onChange={(n) => this.setState({ nameQuizz: (n.target.value) })} />
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
                                        Crear Actividad
                                    </button>
                                    <br />
                                    <br />
                                </div>
                            </form>


                        </div>
                    </div>
                    {/* -------------------------------------------------------------------------- */}
                    <div className='newClaseFotter'>
                        <button className="btn btn-secondary btn-lg btn-block" type="button" onClick={this.props.history.goBack} >Volver</button>
                    </div>
                </div>
            </div>
        )
    }
}