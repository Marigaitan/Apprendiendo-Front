import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/account.png'
import '../css/MenuAlumno.css'
import { get } from 'lodash';

const cookies = new Cookies();
let newProjectUrl = "http://localhost:8080/classroom/" + cookies.get('classid') + "/project";
let getMethodologiesUrl = "http://localhost:8080/methodologies";

export default class DocenteNuevoProyecto extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {name: "Nuevo Proyecto", teacherId: cookies.get('teacherId'), methodologies: [], methodologyId: -1};
    }
    
    
    //TODO: en lugar de username y password, seria nombre del proyecto y seleccionar una metodologia de la lista que devuelve this.getMethodologies()
    state = {
        form: {
            name: ''
        }
    }

    newProject(name, methodologyId) {
        axios.post(newProjectUrl, 
            {
                methodologyId: methodologyId.toString(),
                name: name,
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
                alert('error en la materia');
            }).then(this.goClassroom(this.state.classroomId));
    }

    goClassroom(){
        window.location.href = "/menudocente/classroom";
    }

    getMethodologies = async () => {
        await axios.get(getMethodologiesUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                const methodologies = response.data.map(methodology => ({ name: methodology.name, id: methodology.id }));
                this.setState({ methodologies });
            })
            .catch(error => {
                console.log(error);
                alert('error en las metodologias');
            });
    }
    

    handleChange = async e => {   //con este metodo guardamos en el estado el valor del imput de acuerdo 
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        window.onload = this.getMethodologies;

        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <input
                        type="name"
                        className="inputs"
                        name="name"
                        placeholder="Nombre del Proyecto"
                        maxLength="10"
                        onChange={this.handleChange} />
                    <br />
                    <div className="classcontainer">
                            {this.state.methodologies.map(methodology => { 
                                return (<button className="classButton" id={methodology.id} onClick={() => {this.setState(state => state.methodologyId = methodology.id);
                                console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
                                console.log(this.state);
                                console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
                                }}>
                                    {methodology.name}
                                    </button>) 
                                })};
                    </div>
                    <button onClick={() => this.newProject(this.state.name, this.state.methodologyId, this.state.teacherId)} className="submit-button">{"Crear"}</button>
                </div>
            </div>
        );
    }
}
