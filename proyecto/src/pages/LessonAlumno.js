import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno"
import '../css/Global.css';
import '../css/LessonAlumno.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const cookies = new Cookies();


export default class LessonAlumno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: '',
            activities: [],
            files: [],
            archivos: null,
            documents: [],
            lessonName: '',
            lessonDescription: '',
            actDocuments: [],
            openModal: false,
            modalId: -1
        };
    }

    //------------------------Files----------------------------------------------
    subirArchivos = async elem => {
        console.log('imprimiendo elem')
        console.log(elem);
        const base64 = await this.convertToBase64(elem[0]);
        console.log('imprimiendo base64')
        console.log(base64);
        let archivos = {
            name: elem.name,
            dataType: elem.type,
            data: base64
        }
        this.setState(archivos);
    }

    convertToBase64 = async (fileUpload) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileUpload);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    insertarArchivos = async () => {
       
        console.log('archivos')
        console.log(this.state.archivos)
        let documento = {
            position: 0,
            name: this.state.archivos.name,
            dataType: this.state.archivos.dataType,
            data: this.state.archivos.data
        }
        console.log('documento')
        console.log(documento)

        await axios.post(API_HOST + 'document', documento, { headers: { 'Authorization': cookies.get('token') } })
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

    }
   
    //---------------------------------------------------------------------------
    async componentDidMount() {
        let getLessonUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/template";
        let getDocumentsSummUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/documents/summary";
        let getDocumentsSelUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/documents/selective";
        
        const requestOne = axios.get(getLessonUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getDocumentsSummUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestThree = axios.get(getDocumentsSelUrl, { headers: { 'Authorization': cookies.get('token') } });

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
                const actDocuments = lesson.data.activities.map(activity => {
                    let activityDoc = 
                        {
                            name: activity.documents[0].name,
                            position: activity.documents[0].position,
                            dataType: activity.documents[0].dataType,
                            data: activity.documents[0].data,
                            activityId: activity.id
                        }
                    return activityDoc;
                });

                this.setState({
                    lessonName: lessonName,
                    lessonDescription: lessonDescription,
                    files: files, 
                    activities: activities,
                    actDocuments: actDocuments,
                })

            }))
            .catch(error => {
                console.log(error)
            });

    }
    //---------------------------Descargar Documentos -------------------------------

    async alumnoDescargaFile(url, fileName) {
        await axios.get(
            url,
            {
                headers: {
                    'Authorization': cookies.get('token')
                }
            }
        )
            .then(response => {
                const buff = Buffer.from(response.data.data, 'base64')
                const url = window.URL.createObjectURL(new Blob([buff]));
                const link = document.createElement('a');
                link.href = response.data.data;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove()
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
            });
    }
    //----------------------POPup-Actividades---------------------------------------
    openModal = (id) => {
        this.setState({ openModal: true, modalId: id });
    }

    closeModal() {
        this.setState({ openModal: false, modalId: -1 });
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
                            {this.state.actDocuments.map(actDocument => {
                                return (
                                    <div key={actDocument.activityId} id={actDocument.activityId}>
                                        <h4><Button color="success" onClick={() => this.openModal(actDocument.activityId)}>{actDocument.name}</Button></h4>
                                        <Modal isOpen={this.state.openModal && this.state.modalId === actDocument.activityId} className="modalStyle">
                                            <ModalHeader size='lg' >
                                                {actDocument.name}
                                            </ModalHeader>
                                            <ModalBody>
                                                <h4>{actDocument.data}</h4>
                                            </ModalBody>
                                            <ModalFooter className="modalFooter">
                                                <Button color="secondary" onClick={() => this.closeModal()}>Finalizar</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>)
                            })}
                        </div>
                        <div className="materialDocente">
                            <h4>Material:</h4>
                            {this.state.files.map(files => {
                                return (
                                    <div key={files.id} id={files.id}>
                                        <h3>
                                            <li><button onClick={() => this.alumnoDescargaFile(API_HOST + 'document/' + files.id , files.name)}>{files.name}</button></li>
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
