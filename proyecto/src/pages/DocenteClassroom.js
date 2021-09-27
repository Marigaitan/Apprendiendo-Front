import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import HeaderTeacher from "./Header"
import { API_HOST } from "../constants";


import {Button,ButtonGroup, Nav, NavItem, NavLink} from 'reactstrap';



const cookies = new Cookies();


export default class DocenteClassroom extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, students: [], projects: [], teacherName: "" };
    }

    async componentDidMount() {

        let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
        let getProjectsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects";
        let getTeacherUrl = API_HOST + "user/";

        //AXIOS
        const requestOne = axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestThree = axios.get(getProjectsUrl, { headers: { 'Authorization': cookies.get('token') } });

        axios.all([requestOne,
            requestThree])
            .then(axios.spread((classData, projectsData) => {
                console.log(classData.data, projectsData.data);
                //SET DATA
                const subject = classData.data.subject;
                const year = classData.data.year;
                const division = classData.data.division;
                const teacherId = classData.data.teacherId;

                const projects = projectsData.data.map(project => ({ id: project.id, name: project.name }));

                //SET STATE
                this.setState({
                    subject: subject,
                    year: year,
                    teacherId: teacherId,
                    division: division,
                    projects: projects,
                })
                return axios.get(getTeacherUrl + classData.data.teacherId, { headers: { 'Authorization': cookies.get('token') } });
            }))
            .then(response => {
                const teacherName = response.data.username;
                console.log(response)
                this.setState({ teacherName: teacherName })
            })
            .catch(error => console.log(error));
    }

    goDocenteProyecto = (project) => {
        cookies.set('projectid', project.id, { path: "/" });
        this.props.history.push("/menudocente/classroom/proyecto");
    }


    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }
    goToProyecto=(id) =>{
        cookies.set('projectid', id, { path: "/menudocente/classroom" });
        window.location.href = "/menudocente/classroom/proyecto";
    }

    render() {

        console.log(cookies.get('classid'));

        this.redirect();

        console.log(this.state);

        return (
                <div className="mainContainer">
                    <HeaderTeacher />
                    <div>
                        <div classname="navBar">
                            <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
                                <Nav tabs>
                                    <NavItem>
                                    <NavLink href="/menudocente/classroom" active>Proyectos</NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink href="/menudocente/classroom/alumnos">Alumnos</NavLink>
                                    </NavItem>
                                    <NavItem>
                                    <NavLink href="/menudocente/classroom/nuevoproyecto">Nuevo Proyecto</NavLink>
                                    </NavItem>  
                                </Nav>
                        </div><br />
                        <div className="pro">
                            <h2>Proyectos</h2>
                            <div>
                                <ButtonGroup vertical>
                                {this.state.projects.map(project => { return (<div key={project.id} id={project.id}><h3><li><Button onClick={(id)=> this.goToProyecto(id)} >{project.name}</Button></li></h3></div>) })}
                                </ButtonGroup>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        }
}