import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno"
import '../css/Global.css';
import '../css/LessonAlumno.css';

const cookies = new Cookies();


export default class LessonAlumno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson:'',
            activities: [],
            files:[],
            archivos: [],
            documents: []
        };
    }

    //------------------------Files----------------------------------------------
    subirArchivos = elem => {
        let archivos = elem;
        this.setState(archivos);
    }
    insertarArchivos = async () => {
        // const f = new FormData();

        for (let index = 0; index < this.archivos.length; index++) {

            let documento = {
                id: null,
                position: index,
                name: this.archivos[index].name,               
                dataType: "FILE",
                data: Buffer.from(toString(this.archivos[index]), 'base64')
            }
            let documents= documents.concat(documento);
            this.setState(documents);
            
        }
        console.log(this.documents);
    }
    //---------------------------------------------------------------------------
    async componentDidMount() {
        let getLessonUrl = API_HOST + "lesson/" + cookies.get('lessonid');
        let getActivitiesUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/activities";
        let getDocumentsUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/documents";
    
        const requestOne = axios.get(getLessonUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getActivitiesUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestThree = axios.get(getDocumentsUrl, { headers: { 'Authorization': cookies.get('token') } });
    
        await axios.all([requestOne, requestTwo, requestThree
        ])
            .then(axios.spread((lesson,activities, files
            ) => {
                console.log(
                     lesson.data,
                     activities.data,
                     files.data
                );
    
                this.setState({
                    lesson: lesson.data,
                    activities: activities.data,
                    files: files.data
                })
            }))
            .catch(error => {
                console.log(error)
            });
    }
    render() {
        return (
            <div className="mainContainer">
                <HeaderStudent />
                <div className="alumnoLesson">
                    <div>
                        <h2>{this.state.lesson.name}</h2>
                    </div>
                    <div className="enunciado">
                        <h4>{this.state.lesson.description}</h4>
                    </div>
                    <div className="lessonActivities">
                        <div className="quizzCuestionario">
                            <h4>Actividades:</h4>
                        </div>
                        <div className="materialDocente">
                            <h4>Material:</h4>
                            {this.state.files.map(files => {
                                return (
                                    <div key={files.id} id={files.id}>
                                        <h3>
                                            <li><button>{files.name}</button></li>
                                        </h3>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className="uploadDocStudent">
                        <h4>Cargar Nueva Tarea:</h4>
                        <input type="file" name="documents" multiple onChange={(elem) => this.subirArchivos(elem.target.files)} />
                        <br />
                        <button className="btn btn-primary" onClick={() => this.insertarArchivos()}>Insertar Archivos</button>
                    </div>
                </div>
            </div>
        )
    }
}
