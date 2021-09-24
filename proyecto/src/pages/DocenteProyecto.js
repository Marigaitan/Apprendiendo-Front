import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';

import { API_HOST } from "../constants";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import HeaderTeacher from "./Header"

import "../css/DocenteProyecto.css";

const cookies = new Cookies();
let getStudentsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects" + cookies.get('projectid') + "/students";
let getLessonsUrl = API_HOST + "lesson/" + cookies.get('lessonid') + "/activities";

export default class DocenteProyecto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [], lessons: []
        };
    }

    async componentDidMount() {

        //AXIOS
        const requestOne = axios.get(getLessonsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });

        axios.all([requestOne,
            requestTwo])
            .then(axios.spread((studentsData, classData) => {
                console.log(classData.data, studentsData.data);
                //SET Activities of lesson

                //const students = studentsData.data.map(student => ({ id: student.id, username: student.username }));
                //SET STATE
                this.setState({
                    // subject: subject,
                    // year: year,
                    // teacherId: teacherId,
                    // division: division,
                    //students: students
                })
            }))
            .then(response => {
                console.log(response)

            })
            .catch(error => {
                console.log(error)
                const students = [{ id: 1, username: 'grupo 1' }, { id: 2, username: 'grupo 2' }]
                const lessons = [{ id: 1, name: 'clase 1' }, { id: 2, name: 'clase 2' }]
                //SET STATE
                this.setState({
                    // subject: subject,
                    // year: year,
                    // teacherId: teacherId,
                    // division: division,
                    students: students,
                    lessons: lessons
                })
            });
    }

    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }

    render() {

        console.log(this.state.students, this.state.lessons);
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
                                            <Button key={student.id}>{student.username}</Button>
                                        </div>
                                    )
                                })
                            }
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
