import React, { Component } from 'react'
import { Button, Label, FormGroup, Input, FormText } from 'reactstrap'
import HeaderTeacher from './Header'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class NuevaClase extends Component {
    render() {
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div>
                    <h2>Clase Nueva</h2>
                    <div className="boxEnunciado">
                        <FormGroup>
                            <Label for="exampleText"><h4>Ingrese el enunciado de la clase que quiere compartir
                                con los alumnos:</h4></Label>
                            <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup>
                    </div>
                    <div className="boxMaterial">
                        <FormGroup>
                            <Label><h4>Agregar material de soporte</h4></Label>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                En esta sección, puede adjuntar material de soporte que quiera dejar disponible al alumno al ingresar a esta clase.
                            </FormText>
                        </FormGroup>

                    </div>
                    <div className="boxFechas">
                        <h4>Disponible desde:</h4><FormGroup>
                            <Input
                                type="date"
                                name="startDate"
                                id="startDate"
                                placeholder="date placeholder"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="time"
                                name="startTime"
                                id="startTime"
                                placeholder="time placeholder"
                            />
                        </FormGroup>  <h4>Hasta:</h4>
                        <FormGroup>
                            <Input
                                type="date"
                                name="dueDate"
                                id="dueDate"
                                placeholder="date placeholder"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="time"
                                name="dueTime"
                                id="dueTime"
                                placeholder="time placeholder"
                            />
                        </FormGroup>
                        <FormText color="muted">
                               Más adelante podrá volver a la clase creada y editarla!
                        </FormText>
                    </div>
                    <div className="boxActividades">

                    </div>
                    <div className="boxButtons">
                        <Button color="primary">Crear</Button>
                        <Button color="secondary">Cancelar</Button>
                    </div>
                </div>
            </div>
        )
    }
}
