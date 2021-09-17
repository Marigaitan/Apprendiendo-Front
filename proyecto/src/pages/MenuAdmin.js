import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

export default class MenuAdmin extends Component {
    cerrarSesion=()=>{
        cookies.remove('token', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('role', {path: "/"});
        cookies.remove('id', { path: "/" });
        this.props.history.push('/'); //lo redirijo al login
    }

    componentDidMount(){    //para que lo redirija al login si no hay token
        if(!cookies.get('token')|| cookies.get('role') !== "ROLE_ADMIN"){
            this.props.history.push("/");
        }
    }
    render() {
        console.log('role: ' + cookies.get('role'));
        console.log('username: ' + cookies.get('username'));
        return (
            <div>
                Menú principal del Admin
                <br />
                <button onClick={()=> this.cerrarSesion()}>cerrar sesión</button> {/* Provisorio hasta tener el menu desplegable */}
            </div>
        )
    }
}
