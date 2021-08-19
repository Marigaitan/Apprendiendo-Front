import React, { Component } from 'react'
import im from '../Images/logo-verde.png'
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios' //para las peticiones a la API
//import md5 from 'md5'
import Cookies from 'universal-cookie/es6'

const baseUrl = "http://localhost:8080/login";  //Url de la API
const cookies = new Cookies();

export default class Login extends Component {

    //Necesitamos un estado y un metodo para capturar lo que el usuario ingrese
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    handleChange = async e => {   //con este metodo guardamos en el estado el valor del imput de acuerdo 
        await this.setState({     //a su nombre. Asi que los estado tienen que coincidir con el nombre
            form: {              //de los imputs.
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form); //Lo mostramos por consola para ver que funcione
    }                              //uso async y await para q sea asincrono y verlo en tiempo real
    
    
    sendCredentials = async () => {
        let body = { username: this.state.form.username, password: this.state.form.password };
        await axios.post(baseUrl, body) //aca podria usar MD5
            .then(response => {
                cookies.set('token', response.headers.Authentication, { path: "/" });
                return response.data; //aca retonamos la data que viene en el body
            })
            .then(response => {  //aca la podemos utilizar
                if (response.length > 0) {
                    var respuesta = response[0];
                    cookies.set('username', respuesta.username, { path: "/" });
                    cookies.set('role', respuesta.role, { path: "/" });
                    cookies.set('id', respuesta.id, { path: "/" });
                    debugger
                    if (cookies.get('role') === "ROLE_STUDENT") {
                        window.location.href = "./menualumno";
                    } else if (cookies.get('role') === "ROLE_TEACHER") {
                        window.location.href = "./menudocente";
                    } else if (cookies.get('role') === "ROLE_ADMIN") {
                        window.location.href = "./menuadmin";
                    }


                } else {
                    alert('El usuario o la contraseña no son correctos');
                }

            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <img
                        src={im}
                        id="logo"
                        alt="No se encuentra la imagen" />
                    <br />
                    <input
                        type="user"
                        className="inputs"
                        name="username"
                        placeholder="Usuario"
                        maxLength="10"
                        onChange={this.handleChange} />
                    <br />
                    <input
                        type="password"
                        className="inputs"
                        name="password"
                        placeholder="Contraseña"
                        maxLength="10"
                        onChange={this.handleChange} />
                    <br />
                    <button onClick={() => this.sendCredentials()} className="submit-button">Ingresar</button>
                </div>
            </div>
        );
    }
}
