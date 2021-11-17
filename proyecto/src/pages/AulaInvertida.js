import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../css/Global.css';
import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";

import { API_HOST } from "../constants";
import axios from 'axios';
import { Button } from 'reactstrap';
import LogoMini from '../Images/logoMini.png';
import Cookies from 'universal-cookie/es6';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import VerticalTimelineElement from './VerticalTimeLineElement';
import { ButtonGroup, Label, Form, FormGroup, Input, FormText, Col } from 'reactstrap'
//import 'react-vertical-timeline-component/style.min.css';
import { CustomInput, Container, Row, Progress, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap';

import VerticalTimeLineElement from '../css/VerticalTimeLineElement.css';

//HACER DISEÑO DE CLASES DE LOS PROYECTOS
//GUARDAR LA INFORMACIÓN
//AGREGAR BOTON DE EDITAR


VerticalTimeline.PropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    animate: PropTypes.bool,
    layout: PropTypes.oneOf([
        '1-column-left',
        '1-column',
        '2-columns',
        '1-column-right',
    ]),
};

VerticalTimeline.defaultProps = {
    animate: true,
    className: '',
    layout: '2-columns',
};

const cookies = new Cookies();

export default class AulaInvertida extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {


            projectId: -1,
            projectName: '',
            openModal: false,
            modalId: -1
        };
    }

    openModal = (id) => {
        this.setState({ openModal: true, modalId: id });
    }

    closeModal() {
        this.setState({ openModal: false, modalId: -1 });
    }


    async createProject() {

        let classparamUrl = API_HOST + "project/template";

        console.log(Date.now())

        const body = {
            "name": this.state.projectName,
            "classroomId": cookies.get('classid'),
            "position": 0,
            "dueDate": "2021-10-11T01:45:50.611Z",
            "startDate": "2021-10-11T01:45:50.611Z",
            "active": true,
            "lessons": [
                {
                    "name": "Pregunta Disparadora",
                    "position": 0,
                    // "dueDate": "2021-10-11T01:45:50.611Z",
                    // "startDate": "2021-10-11T01:45:50.611Z",
                    "active": false,
                    "activities": []
                },
                {
                    "name": "Formando Equipos",
                    "position": 1,
                    // "dueDate": "2021-10-11T01:45:50.611Z",
                    // "startDate": "2021-10-11T01:45:50.611Z",
                    "active": false,
                    "activities": []
                },
                {
                    "name": "Planificación",
                    "position": 2,
                    // "dueDate": "2021-10-11T01:45:50.611Z",
                    // "startDate": "2021-10-11T01:45:50.611Z",
                    "active": false,
                    "activities": []
                },
                {
                    "name": "Investigación",
                    "position": 3,
                    // "dueDate": "2021-10-11T01:45:50.611Z",
                    // "startDate": "2021-10-11T01:45:50.611Z",
                    "active": false,
                    "activities": []
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
                        lessonIds: ids
                    })
                })
            })

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div>
                    <div className="title">
                        Aula Invertida
                    </div>
                    <VerticalTimeline lineColor='rgb(33, 150, 243)'>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            img={LogoMini}
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
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                            </Form>
                            <div><Button onClick={() => this.createProject()} color="success" >Guardar</Button></div>






                        </VerticalTimelineElement>

                        {/* CLASE 1 */}
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            //date="2011 - present"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            img={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Lección inicial</h3>
                            <h4 className="vertical-timeline-element-subtitle">Disponibilización de material </h4>
                            <div>
                                <p>
                                    Se debe introducir el o los temas a a aprender a los alumnos  disponibilizando material interactivo
                                    para que los alumnos utilicen su tiempo de tarea en el hogar aprendiendo la parte teórica y el tiempo del aula sea utilizado para trabajar en la parte práctica

                                </p></div>
                            <div><Button color="success" onClick={() => this.openModal(1)}>Activar Clase</Button></div>
                            <Modal isOpen={this.state.openModal && this.state.modalId === 1} className="modalStyle">
                                <ModalHeader size='lg' >

                                </ModalHeader>
                                <ModalBody>
                                    <ModalHeader className="mainContainer">
                                    </ModalHeader>
                                    <ModalBody >
                                        <div>
                                            <h3 className="title">Lección inicial </h3>
                                        </div>
                                        <div className="maincontainer">
                                            En esta etapa, el docente disponibiliza diversos materiales para que el alumno
                                            utilice el tiempo en el que está en su hogar para aprender los diferentes conceptos
                                            señalados en el mismo. Pueden ser apuntes o vídeos.
                                            De esta manera el tiempo de la clase en el aula podrá ser dedicada
                                            para trabajar la parte práctica generando más productividad en los alumnos
                                            dado que se aprovecha el tiempo para resolver dudas puntuales o continuar avanzando agregando dificultad
                                        </div>
                                        <Alert color="info"> Los siguientes campos serán visualizados por el alumno una vez guardados los cambios </Alert>
                                        <div>
                                            <h3>Ingresar título del tema (lo verá el alumno) </h3>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="exampleText"><p>
                                                    </p></Label>
                                                    <Input type="textarea" name="text" id="exampleText" />
                                                </FormGroup>
                                            </Form>
                                        </div>
                                        <br />
                                        <div>
                                            <h3>Breve descripción (opcional)</h3>
                                            <FormGroup>
                                                <Label for="exampleText"><p>
                                                </p></Label>
                                                <Input type="textarea" name="text" id="exampleText" />
                                            </FormGroup>
                                        </div>
                                        <div>
                                            <h3>Disponibilizar material</h3>
                                            <FormGroup>
                                                <Label for="exampleText"><p>
                                                </p></Label>
                                                <Input type="textarea" name="text" id="exampleText" />
                                            </FormGroup>
                                        </div>

                                        {/* La idea es que haya grupos pero por el momento tengo solo ids de estudiantes */}

                                        {/* <ListGroup>
                                                    {studentGroup.studentGroup.map(student => {
                                                        return (
                                                            <ListGroupItem color="warning" key={student.id}>{student.username}</ListGroupItem>
                                                    )})}
                                                    </ListGroup> */}
                                        <div className="center-text">

                                        </div>
                                        <div className="center-alert">
                                            <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                                            <FormGroup>
                                                <Label for="dueDate"></Label>
                                                <Input
                                                    type="date"
                                                    name="duedate"
                                                    id="date"
                                                    placeholder="Hora de Finalización"
                                                />
                                            </FormGroup>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter className="modalFooter">
                                        <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                                    </ModalFooter>
                                </ModalBody>
                            </Modal>


                        </VerticalTimelineElement>

                        {/* CLASE 2 */}


                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            //date="2010 - 2011"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Práctica Inicial</h3>
                            <h4 className="vertical-timeline-element-subtitle"></h4>
                            <p>
                                Se disponibiliza este espacio
                                para que los alumnos realicen una actividad con el fin de hacer una primera detección de las dificultades que tuvieron
                                con los distintos conceptos. Esta detección servira como guía tanto al docente como al alumno para entender sobre que temas se debe trabajar
                            </p>
                            <div><Button color="success" onClick={() => this.openModal(2)}   >Activar Clase</Button></div>
                            <Modal isOpen={this.state.openModal && this.state.modalId === 2} className="modalStyle">
                                <ModalHeader size='lg' >

                                </ModalHeader>
                                <ModalBody>
                                    <div>
                                        <h3 className="title">Práctica inicial </h3>
                                    </div>
                                    <div className="maincontainer">
                                        Con el fin de avanzar en las clases y hacer más productivo el tiempo de clase en el aula, el docente
                                        podrá disponiblizar una práctica inicial a modo de refuerzo sobre el material teórico brindado en la clase anterior. De esta manera se podrán detectar
                                        inicialmente los temas con los que mayor dificultad se encontró cada uno.
                                    </div>
                                    <div>
                                        <h3>Ingresar título del tema </h3>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleText"><p>
                                                </p></Label>
                                                <Input type="textarea" name="text" id="exampleText" />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    <br />
                                    <div>
                                        <h3>Breve descripción (opcional)</h3>
                                        <FormGroup>
                                            <Label for="exampleText"><p>
                                            </p></Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <h3>Disponibilizar material de práctica</h3>
                                        <FormGroup>
                                            <Label for="exampleText"><p>
                                            </p></Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <h3>Crear Cuestionario</h3>
                                        <FormGroup>
                                            <Label for="exampleText"><p>
                                            </p></Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </div>

                                    {/* La idea es que haya grupos pero por el momento tengo solo ids de estudiantes */}

                                    {/* <ListGroup>
                                                    {studentGroup.studentGroup.map(student => {
                                                        return (
                                                            <ListGroupItem color="warning" key={student.id}>{student.username}</ListGroupItem>
                                                    )})}
                                                    </ListGroup> */}
                                    <div className="center-text">

                                    </div>
                                    <div className="center-alert">
                                        <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                                        <FormGroup>
                                            <Label for="dueDate"></Label>
                                            <Input
                                                type="date"
                                                name="duedate"
                                                id="date"
                                                placeholder="Hora de Finalización"
                                            />
                                        </FormGroup>
                                    </div>

                                </ModalBody>
                                <ModalFooter className="modalFooter">
                                    <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                                </ModalFooter>
                            </Modal>



                        </VerticalTimelineElement>


                        {/* CLASE 3 */}
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            //date="2008 - 2010"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Práctica de Refuerzo </h3>
                            <h4 className="vertical-timeline-element-subtitle">Optativa</h4>
                            <p>
                                Esta clase podría activarse para solicitar algún entregable del alumno o alumna relacionado al tema
                                o bien disponibilizar otra actividad cambiando el nivel de dificultad.
                            </p>
                            <div><Button color="success" onClick={() => this.openModal(3)}  >Activar Clase</Button></div>
                            <Modal isOpen={this.state.openModal && this.state.modalId === 3} className="modalStyle">
                                <ModalHeader size='lg' >

                                </ModalHeader>
                                <ModalBody>
                                    <div>
                                        <h3>Ingresar título del tema </h3>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleText"><p>
                                                </p></Label>
                                                <Input type="textarea" name="text" id="exampleText" />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    <br />
                                    <div>
                                        <h3>Breve descripción (opcional)</h3>
                                        <FormGroup>
                                            <Label for="exampleText"><p>
                                            </p></Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <h3>Disponibilizar material de práctica</h3>
                                        <FormGroup>
                                            <Label for="exampleText"><p>
                                            </p></Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <h3>Crear Cuestionario</h3>
                                        <FormGroup>
                                            <Label for="exampleText"><p>
                                            </p></Label>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </div>

                                    {/* La idea es que haya grupos pero por el momento tengo solo ids de estudiantes */}

                                    {/* <ListGroup>
                                                    {studentGroup.studentGroup.map(student => {
                                                        return (
                                                            <ListGroupItem color="warning" key={student.id}>{student.username}</ListGroupItem>
                                                    )})}
                                                    </ListGroup> */}
                                    <div className="center-text">

                                    </div>
                                    <div className="center-alert">
                                        <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                                        <FormGroup>
                                            <Label for="dueDate"></Label>
                                            <Input
                                                type="date"
                                                name="duedate"
                                                id="date"
                                                placeholder="Hora de Finalización"
                                            />
                                        </FormGroup>
                                    </div>

                                </ModalBody>
                                <ModalFooter className="modalFooter">
                                    <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                                </ModalFooter>
                            </Modal>

                        </VerticalTimelineElement>
                    </VerticalTimeline>

                </div>

            </div>)
    }
}



