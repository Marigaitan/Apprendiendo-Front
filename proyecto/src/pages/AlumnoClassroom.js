import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import { Button } from 'reactstrap';
import axios from 'axios';
import HeaderStudent from './HeaderAlumno';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/AlumnoClassroom.css';
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class AlumnoClassroom extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, students: [], projects: [], teacherName: "" };
    }

    async componentDidMount() {
        let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
        let getStudentsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/students";
        let getProjectsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects";
        let getTeacherUrl = API_HOST + "user/";

        //AXIOS
        const requestOne = axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestThree = axios.get(getProjectsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestFour = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });

        await axios.all([requestOne, requestTwo, requestThree, requestFour])
            .then(axios.spread((classData, studentsData, projectsData, teachersData) => {
                console.log(classData.data, studentsData, projectsData.data, teachersData);

                //SET DATA
                const subject = classData.data.subject;
                const year = classData.data.year;
                const division = classData.data.division;
                const teacherId = classData.data.teacherId;

                const students = studentsData.data.map(student => ({ id: student.id, username: student.username }));

                const projects = projectsData.data.map(project => ({ id: project.id, name: project.name }));

                //SET STATE
                this.setState({
                    subject: subject,
                    year: year,
                    teacherId: teacherId,
                    division: division,
                    students: students,
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

    redirect() {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_STUDENT") {
            window.location.href = window.location.origin;
        }
    }

    goAlumnoProyecto = (project) => {
        cookies.set('projectid', project.id, { path: "/" });
        this.props.history.push("/menualumno/classroom/proyecto");
    }

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
                //link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove()
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
            });
    }


    render() {
        console.log(cookies.get('classid'));
        this.redirect();
        console.log(this.state);
        return (
            <div className="mainContainer">
                <HeaderStudent />
                <div className="ClassroomContent">
                    <div>
                        <h1>{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1><br />
                        <h3>{"Docente: " + this.state.teacherName}</h3>
                    </div>
                    <div className="classData">
                        <div className="proAlumno">
                            <h2>Proyectos</h2>
                            <div>
                                {this.state.projects.map(project => <li><Button onClick={() => this.goAlumnoProyecto(project)}>{project.name}</Button></li>)}
                            </div>
                        </div>
                        <div className="barraLateralAlumno">
                            <h2>Estudiantes</h2>
                            <div>
                                {this.state.students.map(student => { return (<div key={student.id} id={student.id}><h3 >{student.username}</h3></div>) })}
                            </div>
                        </div>
                    </div>
                    <div className="classData">
                        {/* este es un ejemplo hardcodeado, cargue un documento tipo imagen en el back con id 410 */}
                        <Button onClick={() => this.alumnoDescargaFile(API_HOST + 'document/409', 'sample.png')}>Descargame!</Button> 
                    </div>
                </div>
            </div>
        )
    }
}