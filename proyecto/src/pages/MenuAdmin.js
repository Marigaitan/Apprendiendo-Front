import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import img from '../Images/account.png';
import '../css/MenuAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();

export default class MenuAdmin extends Component {
    cerrarSesion=()=>{
        cookies.remove('token', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('role', {path: "/"});
        cookies.remove('id', { path: "/" });
        window.location.href='./' //lo redirijo al login
    }

    componentDidMount(){    //para que lo redirija al login si no hay token
        if(!cookies.get('token')|| cookies.get('role') !== "ROLE_ADMIN"){
            window.location.href="./";
        }
    }
   
    render() {
        console.log('role: ' + cookies.get('role'));
        console.log('username: ' + cookies.get('username'));
        return (
            <div className="mainContainer">
                <div className="secContainer">
                <div className="barraUser">
                        <img  src={img} alt="No se encuentra la imagen" id="logoAccount"/>
                        <div className="menuContent">
                                <a onClick={()=>{this.irPerfil()}}>Ver Perfil</a>
                                <a onClick={() => this.cerrarSesion()}>Cerrar sesión</a>
                            </div>
                            <h1 id="userName">{cookies.get('username')}</h1>
                        <div>
                        
                        <button className="classButton" id="12" onClick={() => this.goDocenteAbm()}>{"Docentes"} </button>
                        <button className="classButton" id="12" onClick={() => this.goAlumnosAbm()}>{"Alumnos"} </button>
                        <button className="classButton"  id="12" onClick={() => this.goCursosAbm()}>{"Cursos"} </button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
    goDocenteAbm(){
        window.location.href = "/menuAdmin/docente/abm";

    }
    goAlumnosAbm(){
        window.location.href = "/menuAdmin/alumnos_abm";
    }

    goCursosAbm(){
        window.location.href = "/menuAdmin/cursos_abm"; 
    }
}
