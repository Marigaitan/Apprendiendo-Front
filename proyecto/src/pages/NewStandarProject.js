import React, { Component } from 'react'
import '../css/Global.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import {API_HOST} from "../constants";
import axios from 'axios';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

const cookies = new Cookies();



export default class NewStandarProject extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, teacherName: "", methodologies: [],
        methodologyId: -1, form: {projectName: '', startDate: '', startTime: '', dueDate:'', dueTime:''}};
    }

    handleChange = async e => {   //con este metodo guardamos en el estado el valor del input
        console.log(e.target.value);
        
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
                
            }
        })
    }

    newStandarProject() {
        let newProjectUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project";
        axios.post(newProjectUrl,
            {
                methodologyId: "0",
                challengeId: "0",
                name: this.state.form.projectName,
                startDate: new Date(this.state.form.startDate +" "+ this.state.form.startTime).toISOString(),
                dueDate: new Date(this.state.form.dueDate +" "+ this.state.form.dueTime).toISOString()              
            },
            {
                headers: {
                    'Authorization': cookies.get('token')
                }
            }
        )
            .then(response => {
                console.log(response);
                cookies.set('projectid', response.data, { path: "/menudocente/classroom" });
                window.location.href = "/menudocente/classroom/proyecto"
            })
            .catch(error => {                           
                console.log(error);
                alert('No se pudo crear el Proyecto. Verifique que todos los campos esten completos')
            }).then(this.goClassroom());
    }
    goClassroom(){
        window.location.href = "/menudocente/classroom";
    }

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='formStandar'>
                    <Form>
                        <FormGroup>
                            <Label>Proyecto Estándar</Label>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="projectName">Ingrese el nombre del nuevo proyecto:</Label>
                            <Input
                            type="projectName"
                            name="projectName"//Lo que se asigna a name, es el nombre de las variables que seteamos y a las que queremos vincular
                            id="projectName"
                            placeholder="Nombre"
                            maxLength="20"
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">Ingrese la fecha de Inicio del Proyecto:</Label>
                            <Input
                            type="date"
                            name="startDate"
                            id="startDate"
                            placeholder="Fecha de Inicio"
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startTime">Seleccione la hora de Inicio del Proyecto:</Label>
                            <Input
                            type="time"
                            name="startTime"
                            id="startTime"
                            placeholder="Hora de Inicio"
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dueDate">Ingrese la fecha de Finalización del Proyecto</Label>
                            <Input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            placeholder="Fecha de Finalización"
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dueTime">Seleccione la hora de Finalización del Proyecto:</Label>
                            <Input
                            type="time"
                            name="dueTime"
                            id="dueTime"
                            placeholder="Hora de Finalización"
                            onChange={this.handleChange}
                            />
                            <FormText color="muted">
                            ¡No te preocupes! Vas a poder modificar las Fechas de Inicio y Finalización del proyecto más adelante.
                            </FormText>
                        </FormGroup>
                        <Button color="success" size="lg" onClick={()=> this.newStandarProject()}> Crear Proyecto</Button>{' '}
                        <Button color="secondary" size="lg"onClick={() => this.goClassroom()}>Cancelar</Button>
                        
                        </Form>
                    </div>
                
            </div>
        )
    }
}
