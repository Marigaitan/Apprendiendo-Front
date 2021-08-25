import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6'
import img from '../Images/account.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MenuAlumno.css'
import axios from 'axios'
// import Header from "./Header"


const cookies = new Cookies();
let classUrl = "http://localhost:8080/user/" + cookies.get('id') + "/classrooms";

export default class MenuAlumno extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {  classrooms: [] };
    }
    componentDidMount() {    //para que lo redirija al login si no hay token
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_STUDENT") {
            window.location.href = "./";
        }
    }
    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        cookies.remove('id', { path: "/" });
        window.location.href = './' //lo redirijo al login

    }
    irPerfil = () => {
        alert("aca se ve el perfil de usuario");
    }


    goClassroom(classroomId) {
        window.location.href = "/menualumno/classroom";
        cookies.set('classid', classroomId, { path: "/" });
    }

    classroomAssigned = async () => {
        await axios.get(classUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                const classrooms = response.data.map(classroom => ({ name: classroom.subject, id: classroom.id }));
                this.setState({ classrooms });
            })
            .catch(error => {
                console.log(error);
                alert('Aun no tiene cursos asignados');
            })
    }


    render() {
        console.log('role: ' + cookies.get('role'));
        console.log('username: ' + cookies.get('username'));
        console.log('id: ' + cookies.get('id'));
        console.log('token: ' + cookies.get('token'));

        window.onload = this.classroomAssigned;

        return (
            <div className="containerPrin">
                {/* <Header /> */}
                <div className="containerSec">
                    <div className="barraUser">
                        <img  src={img} alt="No se encuentra la imagen" id="logoAccount"/>
                        <div className="menuContent">
                                <a onClick={()=>{this.irPerfil()}}>Ver Perfil</a>
                                <a onClick={() => this.cerrarSesion()}>Cerrar sesión</a>
                            </div>
                        <h1 id="userName">{cookies.get('username')}</h1>
                    </div>
                    <br />
                    <div className="classcontainer">
                        {this.state.classrooms.map(classroom => {
                            //react necesita una key para identif elementos siblings
                             return (<button key={classroom.id} className="classButton" id={classroom.id} onClick={() => this.goClassroom(classroom.id)}> 
                                {classroom.name}
                            </button>)
                            
                        })
                        };
                    </div>
                </div>
            </div>
        )
    }
}
