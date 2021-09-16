import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AlumnoClassroom.css';
import img from '../Images/account.png';
import {API_HOST} from "../constants";
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
        this.state = { subject: "", year: 0, division: "", teacherId: -1, students: [], projects: [], teacherName: "", modalAbierto: false, togAbierto: false,
        methodologyId: -1, form: {name: 'Nuevo Proyecto'}};
    }

    
    classParam() {
        axios.get(classparamUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                console.log(response);
                const subject = response.data.subject;
                const year = response.data.year;
                const division = response.data.division;
                const teacherId = response.data.teacherId;
                this.setState({ subject: subject, year: year, teacherId: teacherId, division: division });
                console.log("ESTO TIENE QUE PASAR PRIMERO");
                this.getTeacher(); //tiene que existir alguna forma de usar then para ordenar esto desde render, pero no encontre forma por ahora
            })
            .catch(error => {
                console.log(error);
                alert('error en la materia');
            });
    }

    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        cookies.remove('id', { path: "/" });
        window.location.href = window.location.origin; //to-do no funciona bien
    }
    componentDidMount() {    //para que lo redirija al login si no hay token
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }
    irPerfil = () => {
        alert("aca se ve el perfil de usuario");
    }
    getStudents() {
        axios.get(getStudentsUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                console.log(response);
                const students = response.data.map(student => ({ id: student.id, username: student.username }));
                this.setState({ students: students });
                console.log(students);
            })
            .catch(error => {
                console.log(error);
                alert('error obteniendo usuarios');
            })
    }
     getTeacher() {
        console.log("ESTO TIENE QUE PASAR SEGUNDO");
        axios.get(getTeacherUrl + this.state.teacherId, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                const teacherName = response.data.username;
                this.setState({ teacherName: teacherName });
                console.log(teacherName);
            })
            .catch(error => {
                console.log(error);
                alert('error obteniendo usuarios');
            })
    }

    getProjects() {
        axios.get(getProjectsUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                const projects = response.data.map(project => ({ id: project.id, name: project.name }));
                this.setState({projects});
            })
            .catch(error => {
                console.log(error);
                alert('error obteniendo usuarios');
            })
    }



//Esta parte corresponde a la creación del nuevo proyecto 
    abrirModal=()=>{
        this.setState({modalAbierto: !this.state.modalAbierto});
    }
    abrirToggle=()=>{
        this.setState({togAbierto: !this.state.togAbierto});
    }
    handleChange = async e => {   //con este metodo guardamos en el estado el valor del imput
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
            }).then(this.goClassroom());
    }
    goClassroom(){
        window.location.href = "/menudocente/classroom";
        alert('No se pudo crear el Proyecto. Verifique que todos los campos esten completos');
    }
    selectMethodologie = async (metodName) => {
            await axios.get(getMethodologiesUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            
            .then(response => {
                const methodologies = response.data.map(methodology => ({ name: methodology.name, id: methodology.id }));

                /* if (metodName === 'PBL') this.state.methodologyId = this.methodologies.find(e => e.name === 'Basada en Proyectos').id;
                if (metodName === 'Invertida') this.state.methodologyId = this.methodologies.find(e => e.name === 'Aula Invertida').id;
                if (metodName === 'TBL') this.state.methodologyId = this.methodologies.find(e => e.name === 'Basada en el Pensamiento').id;
                if (metodName === 'PEstandar') this.state.methodologyId = this.methodologies.find(e => e.name === 'Proyecto Estandar').id;  */
                
            }
            )
            .catch(error => {
                console.log(error);
                alert('error en las metodologias');
            });
    }
    

    render() {
        console.log(cookies.get('classid'));
        window.onload = () => {
            this.classParam(); //llama a getTeacher adentro, tiene que haber forma de llamarlo desde aca con then, pero se ejecuta fuera de orden
            this.getStudents();
            this.getProjects();
        }
        console.log(this.state);

        const modalStyles={
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
        
        return (
            <div className="mainContainer">
                
                <div className="secContainer">
                    <div className="barraUser">
                    <img  src={img} alt="No se encuentra la imagen" id="logoAccount"/>
                        <div className="menuContent">
                                <a onClick={()=>this.irPerfil()}>Ver Perfil</a>
                                <a onClick={() => this.cerrarSesion()}>Cerrar sesión</a>
                        </div>
                        <h1 id="userName">{cookies.get('username')}</h1>
                    </div>
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
                                {this.state.projects.map(project => { return (<div key={project.id} id={project.id}><a href="/menudocente/classroom/proyecto" >{project.name}</a></div>) })}
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
                                                <DropdownItem onClick={() =>this.selectMethodologie("PBL")}>Basada en Proyectos</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem disabled onClick={() =>this.selectMethodologie("Invertida")}>Aula Invertida</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem disabled onClick={() =>this.selectMethodologie("TBL")}>Basada en el Pensamiento</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() =>this.selectMethodologie("PEstandar")}>Proyecto Estándar</DropdownItem>
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