import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';

import { API_HOST } from "../constants";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Progress, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HeaderTeacher from "./Header"

import "../css/DocenteProyecto.css";

const cookies = new Cookies();

export default class DocenteProyecto extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            students: [], lessons: [], modalAbierto: false, aStudent: ''
        };
    }
    
    async componentDidMount() {
        
        let getStudentsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project/" + cookies.get('projectid') + "/students/progress";
        let getLessonsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project/" + cookies.get('projectid') + "/lessons";
        
        //AXIOS
        const requestOne = axios.get(getLessonsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });

        await axios.all([requestOne,
            requestTwo])
            .then(axios.spread((students, lessons) => {
                console.log(students.data, lessons.data);
                //SET Activities of lesson

                //const students = studentsData.data.map(student => ({ id: student.id, username: student.username }));
                //SET STATE
                // const students = [{ id: 1, username: 'grupo 1', progress: 10, lessons: [{}] }, { id: 2, username: 'grupo 2', progress: 30 }]
                // const lessons = [{ id: 1, name: 'clase 1' }, { id: 2, name: 'clase 2' }]
                //SET STATE
                this.setState({
                    // subject: subject,
                    // year: year,
                    // teacherId: teacherId,
                    // division: division,
                    students: students.data,
                    lessons: lessons.data
                })
            }))
            .catch(error => {
                console.log(error)
                // const students = [{ id: 1, username: 'grupo 1', progress: 10 }, { id: 2, username: 'grupo 2', progress: 30 }]
                // const lessons = [{ id: 1, name: 'clase 1' }, { id: 2, name: 'clase 2' }]
                //SET STATE
                // this.setState({
                //     // subject: subject,
                //     // year: year,
                //     // teacherId: teacherId,
                //     // division: division,
                //     students: students,
                //     lessons: lessons
                // })
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
        this.setState({aStudent: student})
        this.abrirModal();
    }
 
    render() {

        const modalStyles = {
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '200px',
            minHeight: '200px',
            backgroundColor: 'forestgreen'
        }

        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="secContainer">
                    <div>
                        <h2>Nombre del proyecto</h2>
                    </div>
                    <div className="mainFlex">
                        <div className="left">
                            <div>
                                <h3>Grupos</h3>
                            </div>
                            {
                                this.state.students.map(student => {
                                    return (
                                        <div>
                                            <Button key={student.id} onClick={() => this.setStudent(student)}>{student.userId}</Button>
                                        </div>
                                    )
                                })
                            }
                            <Modal isOpen={this.state.modalAbierto} style={modalStyles}>
                                <ModalHeader>
                                    {this.state.aStudent.userId}
                                </ModalHeader>
                                <ModalBody>
                                    <Label>Progreso</Label>
                                    <Progress value={this.state.aStudent.percentageCompleted} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className="center">
                            <div>
                                <h3>Clases</h3>
                            </div>
                            {
                                this.state.lessons.map(lesson => {
                                    return (
                                        <div>
                                            <Button key={lesson.id}>{lesson.name}</Button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
