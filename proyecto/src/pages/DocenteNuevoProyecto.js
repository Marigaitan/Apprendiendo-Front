import React, { Component} from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';
import '../css/Global.css';
import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import {API_HOST} from "../constants";
import axios from 'axios';
import { Button } from 'reactstrap';

const cookies = new Cookies();
let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
let getTeacherUrl = API_HOST + "user/";
let getMethodologiesUrl = API_HOST + "methodologies";

export default class DocenteNuevoProyecto extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, teacherName: "", methodologies: [],
        methodologyId: -1};
    }

    async componentDidMount() {

        //AXIOS
        const requestOne = axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestFour = axios.get(getMethodologiesUrl,{ headers: { 'Authorization': cookies.get('token') } });

        axios.all([requestOne,
            requestFour])
            .then(axios.spread((classData, methodologiesData) => {
                console.log(classData.data, methodologiesData.data);
                //SET DATA
                const subject = classData.data.subject;
                const year = classData.data.year;
                const division = classData.data.division;
                const teacherId = classData.data.teacherId;

                const methodologies = methodologiesData.data.map(methodology => ({ id: methodology.id, name: methodology.name }));

                //SET STATE
                this.setState({
                    subject: subject,
                    year: year,
                    teacherId: teacherId,
                    division: division,
                    
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
    
    render() {
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div>
                    <div classname="navBar">
                        <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
                            <Nav tabs>
                                <NavItem>
                                <NavLink href="/menudocente/classroom">Proyectos</NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink href="/menudocente/classroom/alumnos">Alumnos</NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink href="/menudocente/classroom/nuevoproyecto" active >Nuevo Proyecto</NavLink>
                                </NavItem>  
                            </Nav>
                    </div><br />
                    <div className='newProjectContainer'>
                        <div className='newPBL'>
                            <h2>Metodología Basada en Proyecto</h2><br />
                            <input placeholder='Nombre del Proyecto'></input><br />
                            <Button color="success">Crear Proyecto</Button>
                        </div>
                        <div className='newTBL'>
                            <h2>Metodología Basada en el Pensamiento</h2><br />
                            <input placeholder='Nombre del Proyecto'></input><br />
                            <Button color="success">Crear Proyecto</Button>
                        </div>
                        <div className='newFlipped'>
                            <h2>Aula Invertida</h2><br />
                            <input placeholder='Nombre del Proyecto'></input><br />
                            <Button color="success">Crear Proyecto</Button>
                        </div>
                        <div className='newStandar'>
                            <h2>Proyecto Estándar</h2><br />
                            <input placeholder='Nombre del Proyecto'></input><br />
                            <Button color="success">Crear Proyecto</Button>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}
