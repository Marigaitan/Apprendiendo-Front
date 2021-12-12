import axios from 'axios';
import React, { Component } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import '../css/DocenteClassroom.css';
import '../css/DocenteEditLesson.css';
import '../css/Global.css';
import logo from "../Images/logoMini.png";
import DocenteProyectoCuestionario from './DocenteProyectoCuestionario';
import DocenteProyectoEntregable from './DocenteProyectoEntregable';
import DocenteProyectoQuizz from './DocenteProyectoQuizz';
import HeaderTeacher from "./Header";
import VerticalTimelineElement from './VerticalTimeLineElement';


const cookies = new Cookies();

export default class Tbl extends Component {

    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            projectId: -1,
            projectName: '',
            openModal: false,
            modalId: -1,
            lessonIds: [],
            archivosClase1: [],
            archivosClase2: [],
            archivosClase3: [],
            archivosClase4: [],

            description1: '',
            description2: '',
            description3: '',
            description4: '',
            textClass1: '',
            textClass2: '',
            textClass3: '',
            textClass4: '',
            disableButtonProject: false,
            disableButtonClass1: true,
            disableButtonClass2: true,
            disableButtonClass3: true,
            disableButtonClass4: true,
        };
    }

    openModal = (id) => {
        this.setState({ openModal: true, modalId: id });
    }

    closeModal = () => {
        this.setState({ openModal: false, modalId: -1 });
    }
    addLesson = async (lesson, documents) => {
        let putParamUrl = API_HOST + "lesson";
        await axios.put(putParamUrl, lesson, { headers: { 'Authorization': cookies.get('token') } })
            .then(response => console.log(response.data))
        let sendDocs = documents.map(doc =>
            axios.post(API_HOST + "document", doc, { headers: { 'Authorization': cookies.get('token') } })
        );
        await axios.all(sendDocs).catch(console.log);
        this.closeModal();
    }

    addFirstLesson = () => {
        const lesson = {
            name: this.state.textClass1,
            id: this.state.lessonIds[0], //falta obtener el id de la lesson
            position: 0,
            description: this.state.description1,
            projectId: this.state.projectId,
            active: true,
        }
        this.setState({ disableButtonClass1: true })
        console.log(lesson);
        this.addLesson(lesson, this.state.archivosClase1);
    }

    addSecondLesson = () => {
        const lesson = {
            name: this.state.textClass2,
            id: this.state.lessonIds[1], //falta obtener el id de la lesson
            position: 0,
            description: this.state.description2,
            projectId: this.state.projectId,
            active: true,
        }
        this.setState({ disableButtonClass2: true })
        console.log(lesson);
        this.addLesson(lesson, this.state.archivosClase2);
    }

    addThirdLesson = () => {
        const lesson = {
            name: this.state.textClass3,
            id: this.state.lessonIds[2], //falta obtener el id de la lesson
            position: 0,
            description: this.state.description3,
            projectId: this.state.projectId,
            active: true,
        }
        this.setState({ disableButtonClass3: true })
        console.log(lesson);
        this.addLesson(lesson, this.state.archivosClase3);
    }
    addFourthLesson = () => {
        const lesson = {
            name: this.state.textClass4,
            id: this.state.lessonIds[3], //falta obtener el id de la lesson
            position: 0,
            description: this.state.description4,
            projectId: this.state.projectId,
            active: true,
        }
        this.setState({ disableButtonClass4: true })
        console.log(lesson);
        this.addLesson(lesson, this.state.archivosClase4);
    }
    async createProject() {

        let classparamUrl = API_HOST + "project/template";

        console.log(Date.now())

        const body = {
            name: this.state.projectName,
            classroomId: cookies.get('classid'),
            position: 0,
            active: true,
            rewards: [],
            documents: [],
            lessons: [
                {
                    name: "Organizadores Gráficos",
                    position: 0,
                    description: '',
                    active: false,
                    activities: [],
                    documents: [],
                },
                {
                    name: "Registro de Ideas",
                    position: 1,
                    description: '',
                    active: false,
                    activities: [],
                    documents: [],
                },
                {
                    name: "Búsqueda y Procesamiento de información",
                    position: 2,
                    description: '',
                    active: false,
                    activities: [],
                    documents: [],
                },
                {
                    name: "Toma de decisiones y conclusiones finales",
                    position: 3,
                    description: '',
                    active: false,
                    activities: [],
                    documents: [],
                }
            ]
        }
        await axios.post(classparamUrl, body, { headers: { 'Authorization': cookies.get('token') } })
            .then(response => {
                const projectId = response.data;
                console.log(projectId)
                this.setState({
                    projectId: projectId //TODO agregar state
                })
                return projectId;
            }).then(projectId => {
                let lessonsUrl = API_HOST + "project/" + projectId + "/lessons";
                axios.get(lessonsUrl, { headers: { 'Authorization': cookies.get('token') } })
                    .then(response => {
                        console.log(response.data)
                        const ids = response.data.map(lesson => lesson.id);
                        console.log(ids);
                        this.setState({
                            lessonIds: ids,
                            disableButtonProject: true,
                            disableButtonClass1: false,
                            disableButtonClass2: false,
                            disableButtonClass3: false,
                        })
                        alert("Proyecto creado exitosamente");
                    })
            }).catch(err => console.log(err))

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }


    //--------------------------------------------------------------------------------------------- FILE

    subirArchivos = async (elem, archivosLesson, lessonId) => {
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
            sourceId: lessonId
        }
        this.setState(prevState => ({ ...prevState, [archivosLesson]: prevState[archivosLesson].concat(archivo) }));
        console.log(archivo);
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

    borrarArchivo = (e, archivosLesson) => {
        this.setState(prevState => ({ ...prevState, [archivosLesson]: prevState[archivosLesson].filter(archivo => archivo.name !== e.name) }))
    }




    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='newClaseForm'>
                    {/* aca va el nombre de la clase */}
                    <div className='whiteBox'>

                        {/* <div className='blackLetter'> */}
                        <div>
                            <div className="title">
                                Metodología Basada en el Pensamiento
                            </div>
                            <VerticalTimeline lineColor={"rgb(225, 206, 81)"}>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: "rgb(225, 206, 81)", color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(225, 206, 81)' }}
                                    iconStyle={{ background: 'rgb(255, 97, 51)', color: '#fff' }}
                                    icon={<img src={logo} className="small-img" />}
                                >
                                    {/* configuración inicial */}
                                    <h3 className="vertical-timeline-element-title">Configuración inicial</h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <div>
                                        <p>

                                        </p></div>
                                    <Form>
                                        <FormGroup>
                                            <Label for="exampleText"><p>Para avanzar con la configuración:
                                                Ingresar un nombre con el que se identificará el proyecto y luego guardar
                                            </p></Label>
                                            <Input type="textarea" name="projectName" id="exampleText" onChange={this.handleChange} />
                                        </FormGroup>
                                    </Form>
                                    <div><Button disabled={this.state.disableButtonProject} onClick={() => this.createProject()} color="success" >Crear Proyecto</Button></div>






                                </VerticalTimelineElement>

                                {/* CLASE 1 */}
                                <VerticalTimelineElement
                                    //className="vertical-timeline-element--work"
                                    contentStyle={{ background: "rgb(225, 206, 81)", color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(225, 206, 81)' }}
                                    iconStyle={{ background: 'rgb(255, 161, 51)', color: '#fff' }}
                                    icon={<img src={logo} className="small-img" />}
                                >
                                    <h3 className="vertical-timeline-element-title">Organizadores Gráficos</h3>
                                    <h4 className="vertical-timeline-element-subtitle">Disponibilización de material</h4>
                                    <div>
                                        <p>
                                            Introducir a los estudiantes plantillas de organizadores gráficos con una guía de preguntas sobre el tema a estudiar.
                                        </p></div>
                                    <div><Button disabled={this.state.disableButtonClass1} color="success" onClick={() => this.openModal(1)}>Activar Clase</Button></div>
                                    <Modal isOpen={this.state.openModal && this.state.modalId === 1} className="modalStyle">
                                        <ModalHeader size='lg' >

                                        </ModalHeader>
                                        <ModalBody>
                                            <ModalHeader className="mainContainer">
                                            </ModalHeader>
                                            <ModalBody >
                                                <div>
                                                    <h3 className="title">Organizadores Gráficos</h3>
                                                </div>
                                                <div className="maincontainer">
                                                    En esta primer etapa el objetivo es lograr que el alumno documente su proceso de pensamiento.
                                                    El docente proporciona a los estudiantes una guía con indicadores en forma de preguntas para fomentar el pensamiento de los estudiantes junto con
                                                    organizadores gráficos los cuales los alumnos podrán usar como soporte.
                                                </div>
                                                <Alert color="info"> Los siguientes campos serán visualizados por el alumno una vez guardados los cambios </Alert>
                                                <div>
                                                    <h3>Ingresar título del tema </h3>
                                                    <Form>
                                                        <FormGroup>
                                                            <Label for="exampleText"><p>
                                                            </p></Label>
                                                            <Input type="textarea" name="textClass1" id="exampleText" onChange={this.handleChange} />
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                                <br />
                                                <div>
                                                    <h3>Breve descripción </h3>
                                                    <FormGroup>
                                                        <Label for="exampleText"><p>
                                                        </p></Label>
                                                        <Input type="textarea" name="description1" id="exampleText" onChange={this.handleChange} />
                                                    </FormGroup>
                                                </div>
                                                <div>
                                                    <h3>Disponibilizar material</h3>
                                                    <FormGroup>
                                                        <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase1', this.state.lessonIds[0])} />
                                                        <br />
                                                        {this.state.archivosClase1 && this.state.archivosClase1.map(document =>
                                                            <div key={document.name} >
                                                                <Alert className="flexSpaceBetween">
                                                                    <Label>{document.name}</Label>
                                                                    <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase1')}>Borrar</Button>
                                                                </Alert>
                                                            </div>
                                                        )}
                                                    </FormGroup>
                                                </div>

                                                <div className="center-text">

                                                </div>

                                            </ModalBody>
                                            <ModalFooter className="modalFooter">
                                                <Button color="primary" onClick={() => this.addFirstLesson()}>Activar clase</Button>
                                                <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                                            </ModalFooter>
                                        </ModalBody>
                                    </Modal>


                                </VerticalTimelineElement>

                                {/* CLASE 2 */}


                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: "rgb(225, 206, 81)", color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(225, 206, 81)' }}
                                    iconStyle={{ background: 'rgb(255, 246, 51)', color: '#fff' }}
                                    icon={<img src={logo} className="small-img" />}
                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Registro de ideas

                                    </h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <p>
                                        El docente proveerá instrucciones para que los alumnos registren en la misma
                                        las primeras ideas con respecto a la temática planteada.
                                    </p>
                                    <div><Button disabled={this.state.disableButtonClass2} color="success" onClick={() => this.openModal(2)}>Activar Clase</Button></div>
                                    <Modal isOpen={this.state.openModal && this.state.modalId === 2} className="modalStyle">
                                        <ModalHeader size='lg' >

                                        </ModalHeader>
                                        <ModalBody>
                                            <div>
                                                <h3 className="title">  </h3>
                                            </div>
                                            <div className="maincontainer">
                                                Se espera que el docente de indicaciones a los alumnos de que manera deben registrar sus ideas (brindando o no una plantilla)
                                            </div>
                                            <div>
                                                <h3>Ingresar título del tema </h3>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleText"><p>
                                                        </p></Label>
                                                        <Input type="textarea" name="textClass2" id="exampleText" onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                            <br />
                                            <div>
                                                <h3>Breve descripción (opcional)</h3>
                                                <FormGroup>
                                                    <Label for="exampleText"><p>
                                                    </p></Label>
                                                    <Input type="textarea" name="description2" id="exampleText" onChange={this.handleChange} />
                                                </FormGroup>
                                            </div>
                                            <div>
                                                <h3>Disponibilizar material de práctica</h3>
                                                <FormGroup>
                                                    <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase2', this.state.lessonIds[1])} />
                                                    <br />
                                                    {this.state.archivosClase2 && this.state.archivosClase2.map(document =>
                                                        <div key={document.name} >
                                                            <Alert className="flexSpaceBetween">
                                                                <Label>{document.name}</Label>
                                                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase2')}>Borrar</Button>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </div>
                                            <div>
                                                <h3>Crear Quizz</h3>
                                                <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div>
                                                <h3>Crear Cuestionario</h3>
                                                <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div>
                                                <h3>Crear Entregable</h3>
                                                <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div className="center-text">

                                            </div>

                                        </ModalBody>
                                        <ModalFooter className="modalFooter">
                                            <Button color="primary" onClick={() => this.addSecondLesson()}>Activar clase</Button>
                                            <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                                        </ModalFooter>
                                    </Modal>



                                </VerticalTimelineElement>


                                {/* CLASE 3 */}
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: "rgb(225, 206, 81)", color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(225, 206, 81)' }}
                                    iconStyle={{ background: 'rgb(218, 255, 51)', color: '#fff' }}
                                    icon={<img src={logo} className="small-img" />}
                                >
                                    <h3 className="vertical-timeline-element-title">Búsqueda y procesamiento de información</h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <p>
                                        Hacer del mundo un recurso para los estudiantes haciendo a los mismos participes preguntandoles que fuentes de información considerarían.


                                    </p>
                                    <div><Button disabled={this.state.disableButtonClass3} color="success" onClick={() => this.openModal(3)}  >Activar Clase</Button></div>
                                    <Modal isOpen={this.state.openModal && this.state.modalId === 3} className="modalStyle">
                                        <ModalHeader size='lg' >

                                        </ModalHeader>
                                        <ModalBody>

                                            <div>
                                                <h3 className="title">Búsqueda y procesamiento de información</h3>
                                            </div>
                                            <div className="maincontainer">
                                                Hacer del mundo un recurso para los estudiantes haciendo a los mismos participes preguntandoles que fuentes de información considerarían. Una opción es que los docentes disponibilicen
                                                recursos complementarios como artículos o vídeos.
                                                El objetivo es que los alumnos aprendan a obtener información de múltiples fuentes y aprendan a detectar aquellas que son confiables confiables
                                            </div>


                                            <div>
                                                <h3>Ingresar título de la clase </h3>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleText"><p>
                                                        </p></Label>
                                                        <Input type="textarea" name="textClass1" id="exampleText" onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                            <br />
                                            <div>
                                                <h3>Breve descripción </h3>
                                                <FormGroup>
                                                    <Label for="exampleText"><p>
                                                    </p></Label>
                                                    <Input type="textarea" name="description3" id="exampleText" onChange={this.handleChange} />
                                                </FormGroup>
                                            </div>
                                            <div>
                                                <h3>Disponibilizar material </h3>
                                                <FormGroup>
                                                    <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase3', this.state.lessonIds[2])} />
                                                    <br />
                                                    {this.state.archivosClase2 && this.state.archivosClase2.map(document =>
                                                        <div key={document.name} >
                                                            <Alert className="flexSpaceBetween">
                                                                <Label>{document.name}</Label>
                                                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase3')}>Borrar</Button>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </div>
                                            <div>
                                                <h3>Crear Quizz</h3>
                                                <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div>
                                                <h3>Crear Cuestionario</h3>
                                                <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div>
                                                <h3>Crear Entregable</h3>
                                                <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>

                                            <div className="center-text">

                                            </div>

                                        </ModalBody>
                                        <ModalFooter className="modalFooter">
                                            <Button color="primary" onClick={() => this.addThirdLesson()}>Activar clase</Button>
                                            <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                                        </ModalFooter>
                                    </Modal>

                                </VerticalTimelineElement>

                                {/* Clase 4 */}
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: "rgb(225, 206, 81)", color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(225, 206, 81)' }}
                                    iconStyle={{ background: 'rgb(218, 255, 51)', color: '#fff' }}
                                    icon={<img src={logo} className="small-img" />}
                                >
                                    <h3 className="vertical-timeline-element-title"> Toma de decisiones y conclusiones finales </h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <p>
                                        Los estudiantes deben hacer entrega de las conclusiones finales en base a lo realizado en la clase anterior junto con el complemento de cómo lo realizaron.
                                    </p>
                                    <div><Button disabled={this.state.disableButtonClass3} color="success" onClick={() => this.openModal(3)}  >Activar Clase</Button></div>
                                    <Modal isOpen={this.state.openModal && this.state.modalId === 3} className="modalStyle">
                                        <ModalHeader size='lg' >
                                        </ModalHeader>
                                        <ModalBody>
                                            <div>
                                                <h3 className="title">Búsqueda y procesamiento de información</h3>
                                            </div>
                                            <div className="maincontainer">
                                                Además de las conclusiones es importante que los estudiantes registren el proceso de pensamiento. El objetivo es que puedan crear un proceso estándar para ser utilizado
                                                en futuras actividades y continuar mejorando el mismo. Este proceso se basa en:
                                                -Planificación: ¿Cómo lo harás la próxima vez? ¿Dónde más lo podrás aplicar?
                                                -Evaluación reflexiva: ¿Fue hecho de forma eficaz?
                                                -Conocer la estrategia: ¿Cómo lo has hecho?
                                                -Ser consciente: ¿Qué tipo de pensamiento estás realizando?
                                            </div>
                                            <div>
                                                <h3>Ingresar título de la clase </h3>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleText"><p>
                                                        </p></Label>
                                                        <Input type="textarea" name="textClass1" id="exampleText" onChange={this.handleChange} />
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                            <br />
                                            <div>
                                                <h3>Breve descripción </h3>
                                                <FormGroup>
                                                    <Label for="exampleText"><p>
                                                    </p></Label>
                                                    <Input type="textarea" name="description3" id="exampleText" onChange={this.handleChange} />
                                                </FormGroup>
                                            </div>
                                            <div>
                                                <h3>Disponibilizar material </h3>
                                                <FormGroup>
                                                    <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase3', this.state.lessonIds[2])} />
                                                    <br />
                                                    {this.state.archivosClase2 && this.state.archivosClase2.map(document =>
                                                        <div key={document.name} >
                                                            <Alert className="flexSpaceBetween">
                                                                <Label>{document.name}</Label>
                                                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase3')}>Borrar</Button>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </div>
                                            <div>
                                                <h3>Crear Quizz</h3>
                                                <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div>
                                                <h3>Crear Cuestionario</h3>
                                                <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div>
                                                <h3>Crear Entregable</h3>
                                                <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                                            </div>
                                            <div className="center-text">

                                            </div>

                                        </ModalBody>
                                        <ModalFooter className="modalFooter">
                                            <Button color="primary" onClick={() => this.addFourthLesson()}>Activar clase</Button>
                                            <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                                        </ModalFooter>
                                    </Modal>

                                </VerticalTimelineElement>

                                <VerticalTimelineElement
                                    iconStyle={{ background: 'rgb(51, 255, 107)', color: '#fff' }}
                                    icon={<img src={logo} className="small-img" />}
                                />


                            </VerticalTimeline>

                        </div>
                    </div>
                </div>

            </div >)
    }
}