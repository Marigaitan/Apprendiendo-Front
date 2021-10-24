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
            documents: [],
            lessonName:'',
            lessonDescription:''
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
        let getLessonUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/template";
        let getDocumentsUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/documents";
    
        const requestOne = axios.get(getLessonUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getDocumentsUrl, { headers: { 'Authorization': cookies.get('token') } });
    
        await axios.all([requestOne, requestTwo
        ])
            .then(axios.spread((lesson, file) => {
                console.log(
                     lesson.data,
                     file.data
                );
                const lessonName = lesson.data.name;
                const lessonDescription = lesson.data.description;
                const activities = lesson.data.activities;
                const files = file.data;
    
                this.setState({
                    lessonName: lessonName,
                    lessonDescription: lessonDescription,
                    files: files,
                    activities: activities,
                })
                               
            }))
            .catch(error => {
                console.log(error)
            });
        
    }
//---------------------------Descargar Documentos -------------------------------

    async alumnoDescargaFile(url, fileName, extension) {
        await axios({
            url: url, 
            method: 'GET',
            responseType: 'blob',
            // esto esta comentado ahora porque el ejemplo usa una imagen de una pagina de wikipedia
            // cuando se use contra nuestro proyecto usamos el authorization header
            // headers: {
            //     'Authorization': cookies.get('token')
            // }
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName + '.' + extension);
                document.body.appendChild(link);
                link.click();
            });
    }

    render() {
        return (
            <div className="mainContainer">
                <HeaderStudent />
                <div className="alumnoLesson">
                    <div>
                        <h2>{this.state.lessonName}</h2>
                    </div>
                    <div className="enunciado">
                        <h4>{this.state.lessonDescription}</h4> 
                    </div>
                    <div className="lessonActivities">
                        <div className="quizzCuestionario">
                            <h4>Actividades:</h4>
                            {this.state.activities.map(activities => {
                                return (
                                    <div key={activities.id} id={activities.id}>
                                        <h4>
                                            <li><button>{activities.name}</button></li>
                                        </h4>
                                    </div>)
                            })}
                        </div>
                        <div className="materialDocente">
                            <h4>Material:</h4>
                            {this.state.files.map(files => {
                                return (
                                    <div key={files.id} id={files.id}>
                                        <h3>
                                            <li><button onClick={() => this.alumnoDescargaFile('url', files.name, 'extension')}>{files.name}</button></li>
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
