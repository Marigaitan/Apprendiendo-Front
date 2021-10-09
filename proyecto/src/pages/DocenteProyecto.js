import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';

import { API_HOST } from "../constants";
import { Button, Form, FormGroup, Label, CustomInput, Input, FormText, Container, Row, Col, Progress, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap';
import HeaderTeacher from "./Header";

import "../css/DocenteProyecto.css";

const cookies = new Cookies();

export default class DocenteProyecto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [], lessons: [], aStudent: '', project: '', openModal: false, modalId: -1
        };
    }

    async componentDidMount() {

        let getProjectDetailsUrl = API_HOST + "project/" + cookies.get('projectid')
        let getStudentsUrl = API_HOST +"project/" + cookies.get('projectid') + "/students/progress";
        let getLessonsUrl = API_HOST + "project/" + cookies.get('projectid') + "/lessons";

        //AXIOS
        const requestZero = axios.get(getProjectDetailsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestOne = axios.get(getLessonsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });

        await axios.all([requestZero, requestOne
            ,requestTwo
        ])
            .then(axios.spread((project, lessons
                , students
                ) => {
                console.log(project.data
                    , students.data
                    , lessons.data
                );

                //SET STATE
                // const students =
                //     [{ id: 1, userId: 'Grupo 1', percentageCompleted: 70, studentGroup: [{ id: 5, username: 'paola carrasco' }, { id: 6, username: 'agustin labarque' }] },
                //     { id: 2, userId: 'Grupo 2', percentageCompleted: 30, studentGroup: [{ id: 7, username: 'javier soto' }, { id: 8, username: 'mariel gaitan' }] },
                //     { id: 3, userId: 'Grupo 3', percentageCompleted: 100, studentGroup: [{ id: 5, username: 'nazareno anselmi' }, { id: 6, username: 'pepito perez' }] }]

                //SET STATE
                this.setState({
                    project: project.data,
                    students: students.data,
                    lessons: lessons.data
                })
            }))
            .catch(error => {
                console.log(error)
            });
    }

    abrirModal = () => {
        {
            this.setState({ modalAbierto: !this.state.modalAbierto });
            return
        }
    }

    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }

    setStudent = (student) => {
        // this.setState(prevState => {
        //     let updatedStudent = { ...prevState, aStudent: student};  // cuando debemos actualizar un objeto con varios campos lo hacemos asi
        //     // updatedStudent.username = student.username; 
        //     // updatedStudent.id = student.id; 
        //     // updatedStudent.progress = student.progress; 
        //     console.log(updatedStudent)
        //     return { updatedStudent };
        //   })
        this.setState({ aStudent: student })
        this.abrirModal();
    }

    crearClase = () => {
        window.location.href = "/menudocente/classroom/proyecto/nuevaclase"
    }

    openModal = (id) => {
        this.setState({openModal: true, modalId: id});
     }

     closeModal(){
        this.setState({openModal: false, modalId: -1});
     }

    render() {

        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div>
                    <div>
                        <h2>{this.state.project.name}</h2>
                    </div>
                    <div>
                        <FormGroup>
                            <div>
                                <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Activar/Desactivar Proyecto" />
                            </div>
                        </FormGroup>
                    </div>

                    <div className="mainFlex">
                        <div className="left">
                            <div>
                                <h3>Grupos</h3>
                            </div>
                            {
                                this.state.students.map(studentGroup => {
                                    return (
                                        <div>
                                            <Button size="lg" key={studentGroup.id} onClick={() => this.openModal(studentGroup.userId)}>{studentGroup.userId}</Button>
                                            <Modal isOpen={this.state.openModal && this.state.modalId === studentGroup.userId} className="modalStyle">
                                                <ModalHeader size='lg' className="modalHeader">
                                                    {studentGroup.userId}
                                                </ModalHeader>
                                                <ModalBody>
                                                    <div>
                                                    <h3>Progreso de la clase del grupo: </h3>
                                                        <Progress value={studentGroup.percentageCompleted}>{studentGroup.percentageCompleted}%</Progress>
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <h3>Integrantes:</h3>
                                                    </div>
                                                    <Alert color='warning'>
                                                        {studentGroup.userId}
                                                        {/* La idea es que haya grupos pero por el momento tengo solo ids de estudiantes */}
                                                    </Alert>
                                                    {/* <ListGroup>
                                                    {studentGroup.studentGroup.map(student => {
                                                        return (
                                                            <ListGroupItem color="warning" key={student.id}>{student.username}</ListGroupItem>
                                                    )})}
                                                    </ListGroup> */}
                                                </ModalBody>
                                                <ModalFooter className="modalFooter">
                                                    <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                    )
                                })
                            }
                            {/* {this.state.modal} */}
                        </div>
                        <div className="center">
                            <div>
                                <h3>Clases</h3>
                            </div>
                            {
                                this.state.lessons.map(lesson => {
                                    return (
                                        <div>
                                            <Button key={lesson.id} size="lg">{lesson.name}</Button>
                                        </div>
                                    )
                                })
                            }
                            <div>
                                <Button color="success" size="lg" onClick={() => this.crearClase()}>Crear Clase</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
