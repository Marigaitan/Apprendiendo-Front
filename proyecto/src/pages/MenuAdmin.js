import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import '../css/MenuAdmin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from "./HeaderAdmin";

const cookies = new Cookies();

export default class MenuAdmin extends Component {

    componentDidMount(){    //para que lo redirija al login si no hay token
        if(!cookies.get('token')|| cookies.get('role') !== "ROLE_ADMIN"){
            this.props.history.push("/");
        }
    }
   
    render() {
        console.log('role: ' + cookies.get('role'));
        console.log('username: ' + cookies.get('username'));
        return (
            <div className="mainContainer">
                <HeaderAdmin/>
                <div className="secContainer">
                    <button className="classButton" id="12" onClick={() => this.goDocenteAbm()}>{"Docentes"} </button>
                    <button className="classButton" id="12" onClick={() => this.goAlumnosAbm()}>{"Alumnos"} </button>
                    <button className="classButton"  id="12" onClick={() => this.goCursosAbm()}>{"Cursos"} </button>  
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
