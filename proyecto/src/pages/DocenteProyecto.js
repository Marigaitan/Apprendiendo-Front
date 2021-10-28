import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';

import { API_HOST } from "../constants";
import { Button, Form, FormGroup, Label, CustomInput, Input, FormText, Container, Row, Col, Progress, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap';
import HeaderTeacher from "./Header";
import DocenteProgresoGrupo from './DocenteProgresoGrupo';

import "../css/DocenteProyecto.css";
import VerticalTimelineElement from './VerticalTimeLineElement';
import VerticalTimeline from './VerticalTimeline';
import 'react-vertical-timeline-component/style.min.css';

import logo from "../Images/logoMini.png";

const cookies = new Cookies();

export default class DocenteProyecto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [], lessons: [], project: ''
        };
    }

    async componentDidMount() {

        let getProjectDetailsUrl = API_HOST + "project/" + cookies.get('projectid')
        let getLessonsUrl = API_HOST + "project/" + cookies.get('projectid') + "/lessons";
        let getStudentsUrl = API_HOST + "project/" + cookies.get('projectid') + "/groups";

        //AXIOS
        const requestZero = axios.get(getProjectDetailsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestOne = axios.get(getLessonsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });

        await axios.all([requestZero, requestOne
            , requestTwo
        ])
            .then(axios.spread((project, lessons, groups) => {

                console.log(project.data
                    , groups.data
                    , lessons.data
                );

                //SET STATE
                this.setState({
                    project: project.data,
                    groups: groups.data,
                    lessons: lessons.data
                })


                var requests = []
                groups.data.forEach(group => {
                    //AXIOS
                    let getStudentsGroupProgressUrl = API_HOST + "group/" + group.id + "/progress";
                    let getStudentsIdUrl = API_HOST + "group/" + group.id + "/students";
                    const requestZero = axios.get(getStudentsGroupProgressUrl, { headers: { 'Authorization': cookies.get('token') } });
                    const requestOne = axios.get(getStudentsIdUrl, { headers: { 'Authorization': cookies.get('token') } });
                    requests.push(requestZero);
                    requests.push(requestOne);
                })
                
                let groupsFull = []
                groups.data.forEach(studentGroup => {

                    
                    var studentGroupFull = {
                        progress: null,
                        id: studentGroup.id,
                        name: studentGroup.name,
                        studentIds: null,
                        studentNames: [],
                    }
                    
                    console.log('studentGroupFull');
                    console.log(studentGroupFull);
                    //AXIOS
                    let getStudentsGroupProgressUrl = API_HOST + "group/" + studentGroup.id + "/progress";
                    let getStudentsIdUrl = API_HOST + "group/" + studentGroup.id + "/students";
                    const requestZero = axios.get(getStudentsGroupProgressUrl, { headers: { 'Authorization': cookies.get('token') } });
                    const requestOne = axios.get(getStudentsIdUrl, { headers: { 'Authorization': cookies.get('token') } });

                    var aGroup = [];
                    axios.all([requestZero, requestOne])
                        .then(axios.spread((progress, students) => {

                            // studentGroupFull.studentIds.forEach(async studentId => {
                            //     const getStudentUrl = API_HOST + "student/" + studentId;
                            //     await axios.get(getStudentUrl, { headers: { 'Authorization': cookies.get('token') } })
                            //         .then(response => {
                            //             studentGroupFull.studentNames.push(response.data.firstName + " " + response.data.lastName);
                            //             console.log(studentGroupFull.studentNames)
                            //         })
                            // })
                            studentGroupFull.progress = progress.data
                            studentGroupFull.studentIds = students.data.map(student => student.studentId)
                            aGroup.push(studentGroupFull);

                            var ans = [];
                            ans = studentGroupFull.studentIds.map(studentId => axios.get(API_HOST + "student/" + studentId, { headers: { Authorization: cookies.get("token") } }))

                            return axios.all(ans)
                        }))
                        .then(
                            axios.spread((...res) => {
                                res.forEach(response => {
                                    var aStudentGroup = aGroup.find(group => response.data.id === group.id)
                                    aStudentGroup.studentNames.push(response.data.firstName + " " + response.data.lastName)
                                }
                                );
                            }))
                        .catch((error) => console.log(error));

                    groupsFull.push(aGroup)
                })
                this.setState({
                    groups: groupsFull
                })
            }))
            .catch(error => {
                console.log(error)
            });
    }



    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }



    crearClase = () => {
        window.location.href = "/menudocente/classroom/proyecto/nuevaclase"
    }

    render() {

        console.log(this.state.groups)
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="mainProyecto">
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
                            <div className="center-div">
                                <h3>Grupos</h3>
                            </div>
                            <DocenteProgresoGrupo studentGroups={this.state.groups} />
                            {/* {this.state.modal} */}
                        </div>
                        <div className="right">
                            <div className="center-div">
                                <h3>Clases</h3>
                            </div>
                            <VerticalTimeline layout="2-columns">
                                {
                                    this.state.lessons.map(lesson => {
                                        return (
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element--work"
                                                contentStyle={{ background: 'rgb(225, 206, 81)', color: '#000000' }}
                                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                                date='1/4 al 10/4'
                                                iconStyle={{ background: 'rgb(225, 206, 81)', color: '#000000' }}
                                                icon={<img src={logo} className="small-img" />}
                                            >

                                                <Button key={lesson.id} size="lg" block>{lesson.name}</Button>
                                            </VerticalTimelineElement>
                                        )
                                    })
                                }
                            </VerticalTimeline>
                            <div className="center-div">
                                <Button color="success" size="lg" onClick={() => this.crearClase()}>Crear Clase</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
