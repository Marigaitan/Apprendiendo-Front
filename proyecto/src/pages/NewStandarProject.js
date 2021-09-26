import React, { Component } from 'react'
import '../css/Global.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import {API_HOST} from "../constants";
import axios from 'axios';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

const cookies = new Cookies();
let newProjectUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project";


export default class NewStandarProject extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, teacherName: "", methodologies: [],
        methodologyId: -1, form: {name: '', fechaInicio: '', fechaFin:''}};
    }

    newStandarProject() {
        axios.post(newProjectUrl,
            {
                methodologyId: "0",
                challengeId: "0",
                name: this.state.form.name,
                startDate: this.state.form.fechaInicio,
                dueDate: this.state.form.fechaFin               
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
                            name="projectName"
                            id="projectName"
                            placeholder="Nombre"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startDate">Ingrese la fecha de Inicio del Proyecto:</Label>
                            <Input
                            type="date"
                            name="startDate"
                            id="startDate"
                            placeholder="Fecha de Inicio"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="startTime">Seleccione la hora de Inicio del Proyecto:</Label>
                            <Input
                            type="time"
                            name="startTime"
                            id="startTime"
                            placeholder="Hora de Inicio"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dueDate">Ingrese la fecha de Finalización del Proyecto</Label>
                            <Input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            placeholder="Fecha de Finalización"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dueTime">Seleccione la hora de Finalización del Proyecto:</Label>
                            <Input
                            type="time"
                            name="dueTime"
                            id="dueTime"
                            placeholder="Hora de Finalización"
                            />
                            <FormText color="muted">
                            ¡No te preocupes! Vas a poder modificar las Fechas de Inicio y Finalización del proyecto más adelante.
                            </FormText>
                        </FormGroup>
                        <Button color="success" size="lg"> Crear Proyecto</Button>{' '}
                        <Button color="secondary" size="lg">Cancelar</Button>
                        
                        </Form>
                    </div>
                
            </div>
        )
    }
}
