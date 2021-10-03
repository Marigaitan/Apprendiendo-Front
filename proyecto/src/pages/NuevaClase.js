import React, { Component } from 'react'
import { ButtonGroup, Button, Label, Form, FormGroup, Input, FormText, Col } from 'reactstrap'
import HeaderTeacher from './Header'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';
import { API_HOST } from "../constants";

const cookies = new Cookies();



export default class NuevaClase extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {form: { Clasename: '', consigna: '', startDate: '', startTime: '', dueDate: '', dueTime: '' }
        };
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

    newClase() {
        let newClaseUrl = API_HOST + "lesson";
        axios.post(newClaseUrl,
            {
                id: "0",
                position: "0",
                name: "string",
                projectId: cookies.get('projectid'),
                dueDate: "0",
                startDate: "0",
                active: "false"
            },
            {
                headers: {
                    'Authorization': cookies.get('token')
                }
            }
        )
            .then(response => {
                console.log(response);
                cookies.set('claseid', response.data, { path: "/menudocente/classroom" });
                window.location.href = "/menudocente/classroom/proyecto" + cookies.get('projectid');
            })
            .catch(error => {
                console.log(error);
                alert('No se pudo crear la Clase. Verifique que todos los campos esten completos')
            }).then(this.goProject());
    }
    goProject() {
        window.location.href = "/menudocente/classroom" + cookies.get('projectid');
    }

    render() {
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className='formProyectoClase'>
                    <h2>Clase Nueva</h2>
                    <Form>
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
                        {/* <div className="boxFechas">
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                                <Label className="mr-sm-2"><h4>Disponible desde:</h4></Label>
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

                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                                <Label className="mr-sm-2"><h4>Hasta:</h4></Label>
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
                        </Form>                        
                    </div>*/}
                        <div className="boxActividades">
                            <ButtonGroup vertical>
                                <Button outline color="secondary">Agregar Cuestionario</Button>
                                <Button outline color="secondary">Agregar Selección Múltiple</Button>
                                <Button outline color="secondary">Cargar Video</Button>
                            </ButtonGroup>
                        </div><br />
                        <div className="boxButtons">
                            <FormText color="muted">
                                Más adelante podrá volver a la clase creada y editarla!
                            </FormText><br />
                            <Button color="primary" size="lg">Crear</Button>{' '}
                            <Button color="secondary" size="lg">Cancelar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
