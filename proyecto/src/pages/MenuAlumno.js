import React, { Component, useState } from 'react'
import Cookies from 'universal-cookie/es6'
import img from '../Images/account.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import '../css/MenuAlumno.css'
import axios from 'axios' 


const cookies = new Cookies();
let classUrl = "http://localhost:8080/user/" + cookies.get('id') + "/classrooms";

export default class MenuAlumno extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {dropdown: false, classrooms: []};
      }
    componentDidMount(){    //para que lo redirija al login si no hay token
        if(!cookies.get('token') || cookies.get('role') !== "ROLE_STUDENT"){
            window.location.href="./";
        }
    }
    cerrarSesion=()=>{
        cookies.remove('token', {path: "/"});                                       
        cookies.remove('username', {path: "/"});
        cookies.remove('role', {path: "/"});
        cookies.remove('id', { path: "/" });
        window.location.href='./' //lo redirijo al login
    } 
    irPerfil=()=>{
        alert("aca se ve el perfil de usuario");
    }  
     

    goClassroom(classroomId){
        window.location.href = "/menualumno/classroom";
        cookies.set('classid', classroomId, { path: "/menualumno" });
    }

    classroomAssigned = async () => {
        await axios.get(classUrl , {
            headers: {
              'Authorization': cookies.get('token')
            }
          }) 
            .then(response => {
                const classrooms = response.data.map(classroom => ({name: classroom.subject, id: classroom.id}));
                this.setState({ classrooms });
            })
            .catch(error => {
                console.log(error);
                alert('Aun no tiene cursos asignados');
            })
    }

    Menu=()=>{
        const opencloseDropdown=()=>{
            this.setState({dropdown:!this.state.dropdown});
        } 
        const irPerfil=()=>{
            alert("aca se ve el perfil de usuario");
        }
        
        return (
            <div className = 'DropMenu'>
                <Dropdown isOpen={this.state.dropdown} toggle={opencloseDropdown}>
                    <DropdownToggle caret> 
                     Dropdown Ejemplo  
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>irPerfil}>Ver Perfil</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={()=>this.cerrarSesion()}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
        
    } 

    render() {
        console.log('role: ' + cookies.get('role'));
        console.log('username: ' + cookies.get('username'));
        console.log('id: ' + cookies.get('id'));
        console.log('token: ' + cookies.get('token'));

        window.onload = this.classroomAssigned;
 
        return (
            <div className="containerPrin">
                <div className="containerSec">
                    <div className="barraUser">
                        <img 
                            src= {img}
                            id="logoAccount"
                            alt= "No se encuentra la imagen"
                            onClick= {this.Menu()}
                        />
                        <h1 id="userName">{cookies.get('username')}</h1>
                        <button id='botonlogout' onClick={()=> this.cerrarSesion()}>cerrar sesión</button> {/* Provisorio hasta tener el menu desplegable */}
                        </div>
                        <br />
                        <div className="classcontainer">
                            {this.state.classrooms.map(classroom => {return (<button className="classButton" onClick={()=> this.goClassroom(classroom.id)}>{classroom.name}</button>)})};
                            
                        </div>
                    
                       
                </div>
            </div>
        )
    }
}
