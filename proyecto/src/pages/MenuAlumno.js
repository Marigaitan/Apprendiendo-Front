import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6'
import img from '../Images/logoMini.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';


const cookies = new Cookies();

export default class MenuAlumno extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {dropdown: false};
      }
    cerrarSesion=()=>{
        cookies.remove('token', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('role', {path: "/"});
        cookies.remove('id', respuesta.id, { path: "/" });
        window.location.href='./' //lo redirijo al login
    }

    componentDidMount(){    //para que lo redirija al login si no hay token
        if(!cookies.get('token')){
            window.location.href="./";
        }
    }

    Menu() {
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
                     Dropdown Ejemplo    {/*boton que se va a desplegar */}
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
        return (
            <div>
                Menú principal del alumno
                <img 
                    src= {img}
                    id="logoAvatar"
                    alt= "No se encuentra la imagen"
                    />
                <h2>Hola {cookies.get('username')}</h2>
                <br />
                <button onClick={()=> this.cerrarSesion()}>cerrar sesión</button> {/* Provisorio hasta tener el menu desplegable */}
            </div>
        )
    }
}
