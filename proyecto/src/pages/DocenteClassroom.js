import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import HeaderTeacher from "./Header"
import {API_HOST} from "../constants";
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const cookies = new Cookies();
let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
let getStudentsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/students";
let getProjectsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects";
let getTeacherUrl = API_HOST + "user/";
let newProjectUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project";
let getMethodologiesUrl = API_HOST + "methodologies";


export default class DocenteClassroom extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, students: [], projects: [], teacherName: "", modalAbierto: false, togAbierto: false, methodologies: [],
        methodologyId: -1, form: {name: 'Nuevo Proyecto'}};
    }

    async componentDidMount() {

        //AXIOS
        const requestOne = axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestThree = axios.get(getProjectsUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestFour = axios.get(getMethodologiesUrl,{ headers: { 'Authorization': cookies.get('token') } });

        axios.all([requestOne,
            requestTwo,
            requestThree,
            requestFour])
            .then(axios.spread((classData, studentsData, projectsData, methodologiesData) => {
                console.log(classData.data, studentsData.data, projectsData.data, methodologiesData.data);
                //SET DATA
                const subject = classData.data.subject;
                const year = classData.data.year;
                const division = classData.data.division;
                const teacherId = classData.data.teacherId;

                const students = studentsData.data.map(student => ({ id: student.id, username: student.username }));

                const projects = projectsData.data.map(project => ({ id: project.id, name: project.name }));

                const methodologies = methodologiesData.data.map(methodology => ({ id: methodology.id, name: methodology.name }));

                //SET STATE
                this.setState({
                    subject: subject,
                    year: year,
                    teacherId: teacherId,
                    division: division,
                    students: students,
                    projects: projects,
                    methodologies: methodologies
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


    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        cookies.remove('id', { path: "/" });
        window.location.href = window.location.origin; //to-do no funciona bien
    }

    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }

    irPerfil = () => {
        alert("aca se ve el perfil de usuario");
    }




//Esta parte corresponde a la creación del nuevo proyecto 
    abrirModal=()=>{
        this.setState({modalAbierto: !this.state.modalAbierto});
    }
    abrirToggle=()=>{
        this.setState({togAbierto: !this.state.togAbierto});
    }
    handleChange = async e => {   //con este metodo guardamos en el estado el valor del input
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    newProject() {
        axios.post(newProjectUrl, 
            {
                methodologyId: this.state.methodologyId.toString(),
                name: this.state.form.name,
                challengeId: "0"
            },
            {
                headers: {
                    'Authorization': cookies.get('token')
                }
            }
        )
            .then(response => {
                console.log(response);
                alert('proyecto creado')
            })
            .catch(error => {                           
                console.log(error);
                alert('No se pudo crear el Proyecto. Verifique que todos los campos esten completos')
            }).then(this.goClassroom());
    }
    goClassroom(){
        window.location.href = "/menudocente/classroom";
    }

    render() {
        
        console.log(cookies.get('classid'));

        this.redirect();

        console.log(this.state);

        const modalStyles={
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }   
        
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="secContainer">
                    <div className="mainContent">
                        <div className="barraLateral">
                            <h2>Estudiantes</h2>
                            <div>
                                {this.state.students.map(student => { return (<div key={student.id} id={student.id}><h3 >{student.username}</h3></div>) })}
                            </div>
                        </div>
                        <div className="pro">
                            <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
                            <h2>{"Docente: " + this.state.teacherName}</h2>
                            <h2>Proyectos</h2>
                            <div>
                                {this.state.projects.map(project => { return (<div key={project.id} id={project.id}><Link to="/menudocente/classroom/proyecto">{project.name}</Link></div>) })}
                            </div>
                            <Button color="success" onClick={this.abrirModal}>Crear Nuevo Proyecto</Button>
                            <Modal isOpen={this.state.modalAbierto} style={modalStyles}>  
                                <ModalHeader>
                                    Nuevo Proyecto
                                </ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="newProject">Ingrese el nombre del nuevo Proyecto</Label>
                                        <Input type="text" 
                                            id="newProject" 
                                            name="name"
                                            placeholder="Nombre del Proyecto"
                                            maxLength="20"
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="selMetod">Seleccione la Metodología que desea utilizar</Label><br />
                                        <ButtonDropdown isOpen={this.state.togAbierto} onClick={this.abrirToggle}>
                                            <DropdownToggle caret>
                                                Metodología
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this.state.methodologies.map(methodology => { 
                                                     return (<DropdownItem id={methodology.id} onClick={() => 
                                                        {this.setState(state => 
                                                            state.methodologyId = methodology.id)}}>{methodology.name}</DropdownItem>)})}
                                            </DropdownMenu>
                                            </ButtonDropdown>
                                    </FormGroup>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => this.newProject()}>Crear Proyecto</Button>
                                    <Button color="secondary" onClick={this.abrirModal}>Cancelar</Button>
                                    
                                </ModalFooter>
                            </Modal>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}