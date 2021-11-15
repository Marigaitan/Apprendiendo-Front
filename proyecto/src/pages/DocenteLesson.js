import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/DocenteLesson.css';
import Cookies from "universal-cookie/es6";
import HeaderTeacher from './Header';
import axios from 'axios';
import { API_HOST } from "../constants";
import { Alert, Button, Label } from "reactstrap";
const cookies = new Cookies();

export default class DocenteLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            archivos: [], nameCuest: '', formValuesCuest: [], lesson: null, actividades: [], cuestionarios: [],
        };
    }

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
                this.setState({
                    lesson: response.data,
                    archivos: archivos,
                    actividades: actividades,
                    cuestionarios: cuestionarios,
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
                    name: activityData.documents[0].name,
                    position: activityData.documents[0].position,
                    dataType: activityData.documents[0].dataType,
                    data: activityData.documents[0].data,
                    activityId: activity.id,
                }
        }))
    }

    //--------------------------------------------------------------------------------------------- PROYECTO
    goProject = () => {
        this.props.history.push("/menudocente/classroom/proyecto");
    }




    // -------------------------POST-------------------------------------------------------
    editClase = async () => {
        // let newClaseUrl = API_HOST + "project/" + cookies.get('projectid') + "/lesson/template";
        // let newClase = {
        //     name: name,
        //     description: enun,
        //     position: null,
        //     dueDate: null,
        //     startDate: null,
        //     active: true, //Cambiarlo para que funcione con el switch y en default este en false
        //     activities: actividades,
        //     documents: archivos
        // }
        // console.log(newClase);
        // await axios.post(newClaseUrl,
        //     {
        //         name: name,
        //         description: enun,
        //         position: null,
        //         dueDate: null,
        //         startDate: null,
        //         active: true, //Cambiarlo para que funcione con el switch y en default este en false
        //         activities: actividades,
        //         documents: archivos
        //     },
        //     {
        //         headers: {
        //             'Authorization': cookies.get('token')
        //         }
        //     }
        // )
        //     .then(response => {
        //         console.log(response);
        //         this.goProject();
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         alert('No se pudo crear la Clase')
        //     })
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
            dataType: 'FILE',
            data: base64,
            documentSourceType: 'LESSON',
            sourceId: cookies.get('lessonid')
        }
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

    borrarArchivo = (e) => {
        this.setState(prevState => ({ archivos: prevState.archivos.filter(archivo => archivo.name !== e.name) }))
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
                name: this.state.nameCuest,
                position: this.state.cuestionarios.length,
                dataType: "CUESTIONARIO",
                data: JSON.stringify(this.state.formValuesCuest),
                activityId: null,
            }]
        }
        await axios.post(API_HOST + "activity/", cuestionario, { headers: { Authorization: cookies.get("token"), }, })
            .then(response => {
                cuestionario.id = parseInt(response.data, 10)
                cuestionario.documents[0].activityId = parseInt(response.data, 10)
                this.setState(prevState => (
                    {
                        actividades: prevState.actividades.concat(cuestionario),
                        cuestionarios: prevState.cuestionarios.concat(cuestionario.documents[0]),
                    }
                ));
            })
        console.log(this.state.actividades);
        console.log(this.state.cuestionarios);
    }

    //--------------------------------------------------------------------------------------------- RENDER

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='newClaseForm'>
                    {/* aca va el nombre de la clase */}
                    <div>
                        {this.state.lesson && <h1><Label>{this.state.lesson.name}</Label></h1>}
                    </div>
                    {/* aca va el enunciado */}
                    <div>
                        {this.state.lesson && <h1><Label>{this.state.lesson.description}</Label></h1>}
                    </div>

                    {/* //-----------------------Files------------------------------------------------ */}
                    {/* aca se deben ver los archivos cargados */}
                    {/* luego dar la opcion de cargar uno */}
                    <div className='boxActiv'>
                        <div className='newFile'>
                            <label><h4>Material Cargado</h4></label><br />
                            <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files)} />
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
                            <div>
                                <Label><h4>Cuestionarios</h4></Label>
                                {
                                    this.state.cuestionarios.map(cuestionario => {
                                        return (
                                            <div>
                                                {JSON.parse(cuestionario.data).map(pregunta => <div><Label>{pregunta.question}</Label></div>)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
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


                        {/* <div className='setQuizz'>
                            <label><h4>Agregar Ejercicio de Selección Múltiple</h4></label><br />
                            <form onSubmit={handleSubmitQ}>
                                <label><h4>Título</h4></label><br />
                                <input type="text" name="nameQuizz" className="col-md-8" placeholder="Ingrese el título de la actividad" maxLength="30" onChange={(n) => setNameQuizz(n.target.value)} />
                                {formValuesQuizz.map((element, index) => (
                                    <div className="form-inline" key={index}>
                                        <div>
                                            <label><h5>Pregunta</h5></label>
                                            <input type="text" name="questionText" value={element.questionText || ""} onChange={e => handleChangeQ(index, e)} />
                                            <label><h5>Opción Correcta</h5></label>
                                            <input type="text" name="answerOptions" placeholder="Ingrese la Opción Correcta" value={element.answerOptions || ""} onChange={e => handleChangeQ(index, e)} />
                                        </div>
                                        <div>
                                            <label><h5>Opción</h5></label>
                                            <input type="text" name="answerOptions" placeholder="Ingrese otra Opción" value={element.answerOptions || ""} onChange={e => handleChangeQ(index, e)} />
                                            {
                                                index ?
                                                    <button type="button" className="btn btn-danger" onClick={() => removeFormFieldsQ(index)}>X</button>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                ))}
                                <div className="button-section">
                                    <button className="btn btn-warning" type="button" onClick={() => addFormFieldsQ()}>+ Pregunta</button><br />
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Crear Actividad</button><br /><br />
                                </div>
                            </form>

                        </div> */}
                    </div>
                    {/* -------------------------------------------------------------------------- */}
                    <div className='newClaseFotter'>
                        <button className="btn btn-success btn-lg btn-block" type="submit" onClick={() => this.editClase()}>Crear Clase</button>{' '}
                        <button className="btn btn-secondary btn-lg btn-block" type="button" onClick={() => this.goProject()} >Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}