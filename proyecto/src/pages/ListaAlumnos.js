import React, { Component } from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';
import '../css/Global.css';
import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import {API_HOST} from "../constants";
import axios from 'axios';
import NavDocente from './NavDocente';

const cookies = new Cookies();
let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
let getStudentsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/students";


export default class ListaAlumnos extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", students: []};
    }

    async componentDidMount() {

        //AXIOS
        const requestOne = axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } });
        const requestTwo = axios.get(getStudentsUrl, { headers: { 'Authorization': cookies.get('token') } });

        await axios.all([requestOne,
            requestTwo])
            .then(axios.spread((classData, studentsData) => {
                console.log(classData.data, studentsData.data);
                //SET DATA
                const subject = classData.data.subject;
                const year = classData.data.year;
                const division = classData.data.division;

                const students = studentsData.data.map(student => ({ id: student.id, username: student.username }));

                //SET STATE
                this.setState({
                    subject: subject,
                    year: year,
                    division: division,
                    students: students,
                })
                
            }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="containerDocenteClassroom">
                    <div className="navBar">
                        <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
                        <NavDocente activeBar='alumnos'/>
                    </div><br />
                        <div className='BloqueEstudiantes'>
                            <h2>Estudiantes</h2> 
                            <div>
                                {this.state.students.map(student => { return (<div key={student.id} id={student.id}><h3><li>{student.username}</li></h3></div>) })}
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
