import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/account.png';
import '../css/MenuAlumno.css';
import { get } from 'lodash';
import {API_HOST} from "../constants";

const cookies = new Cookies();
let newProjectUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project";
let getMethodologiesUrl = API_HOST + "methodologies";

export default class DocenteNuevoProyecto extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {teacherId: cookies.get('teacherId'), methodologies: [], methodologyId: -1, form: {name: 'Nuevo Proyecto'}};
    }

    handleChange = async e => {   //con este metodo guardamos en el estado el valor del imput de acuerdo 
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    newProject() {
        axios.post(newProjectUrl, 
            {
                methodologyId: this.state.methodologyId.toString(),
                name: this.state.form.name,
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
                                return (<button className="classButton" id={methodology.id} onClick={() => 
                                    {this.setState(state => 
                                        state.methodologyId = methodology.id);}}>{methodology.name}</button>)})};
                    </div>
                    <button onClick={() => this.newProject()} className="submit-button">{"Crear"}</button>
                </div>
            </div>
        );
    }
}
