import React, { Component } from 'react'
import { ButtonGroup, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Form, FormGroup, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import HeaderTeacher from './Header'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import axios from 'axios';
import { API_HOST } from "../constants";
import QuizzSettings from './QuizzSettings';
import CuestionarioSettings from './CuestionarioSettings';


const cookies = new Cookies();



export default class NuevaClase extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            form: { Clasename: '', enunciado: '', file: '', startDate: '', startTime: '', dueDate: '', dueTime: '', activities: [], modalAbierto1: false, modalAbierto2: false, togAbierto: false }
        };
    }
    abrirModal1 = () => {
        this.setState({ modalAbierto1: !this.state.modalAbierto1 });
    }
    abrirModal2 = () => {
        this.setState({ modalAbierto2: !this.state.modalAbierto2 });
    }
    abrirToggle = () => {
        this.setState({ togAbierto: !this.state.togAbierto });
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
        let newClaseUrl = API_HOST + "project/" + cookies.get('projectid') + "/lesson/template";
        axios.post(newClaseUrl,
            {
                name: "String",
                position: "0",
                dueDate: "0",
                startDate: "0",
                active: "True", //Cambiarlo para que funcione con el switch y en default este en false
                activities: "armar json"
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

        const modalStyles = {
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }

        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className='formProyectoClase'>
                    <h2>Clase Nueva</h2>
                    <Form>
                        <FormGroup>
                            <Label for="ClaseName"><h4>Ingrese el nombre de la clase nueva:</h4></Label>
                            <Input
                                type="text"
                                name="ClaseName"//Lo que se asigna a name, es el nombre de las variables que seteamos y a las que queremos vincular
                                id="ClaseName"
                                placeholder="Nombre"
                                maxLength="20"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <div className="boxEnunciado">
                            <FormGroup>
                                <Label for="enunciado"><h4>Ingrese el enunciado de la clase que quiere compartir
                                    con los alumnos:</h4></Label>
                                <Input
                                    type="textarea"
                                    name="enunciado"
                                    id="enunciado"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="boxMaterial">
                            <FormGroup>
                                <Label><h4>Agregar material de soporte</h4></Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="exampleFile"
                                    onChange={this.handleChange}
                                />
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
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                            <FormGroup>

                                <Input
                                    type="time"
                                    name="startTime"
                                    id="startTime"
                                    placeholder="time placeholder"
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                                <Label className="mr-sm-2"><h4>Hasta:</h4></Label>
                                <Input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    placeholder="date placeholder"
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                            <FormGroup>

                                <Input
                                    type="time"
                                    name="dueTime"
                                    id="dueTime"
                                    placeholder="time placeholder"
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                        </Form>                        
                    </div>*/}
                        <div className="boxActividades">
                            <ButtonGroup vertical>

                                {/* -------------------POP UP Cuestionario ---------------------------------------------------                                */}
                                <Button outline color="secondary" onClick={this.abrirModal1}>Agregar Cuestionario</Button>

                                <Modal isOpen={this.state.modalAbierto1} style={modalStyles}>
                                    <ModalHeader>
                                        Cuestionario
                                    </ModalHeader>
                                    <ModalBody>

                                        <CuestionarioSettings />

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={this.abrirModal1}>Cancelar</Button>

                                    </ModalFooter>
                                </Modal>

                                {/* -------------------POP UP Multiple Choise ---------------------------------------------------                                */}

                                <Button outline color="secondary" onClick={this.abrirModal2}>Agregar Selección Múltiple</Button>

                                <Modal isOpen={this.state.modalAbierto2} style={modalStyles}>
                                    <ModalHeader>
                                        Ejercico de Selección Múltiple
                                    </ModalHeader>
                                    <ModalBody>

                                        <QuizzSettings />

                                    </ModalBody>
                                    <ModalFooter>
                                
                                        <Button color="secondary" onClick={this.abrirModal2}>Cancelar</Button>

                                    </ModalFooter>
                                </Modal>

                            </ButtonGroup>
                        </div><br />
                        <div className="boxButtons">
                            <FormText color="muted">
                                Más adelante podrá volver a la clase creada y editarla!
                            </FormText><br />
                            <Button color="primary" size="lg" onClick={this.newClase}>Crear</Button>{' '}
                            <Button color="secondary" size="lg" onClick={this.goProject}>Cancelar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
