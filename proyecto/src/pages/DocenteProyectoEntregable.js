import axios from "axios";
import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class DocenteProyectoEntregable extends Component {


    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            nameEntregable: '',
            descEntregable: '',
        }
    }

    setEntregable = async (entregable) => {
        if (this.props.lessonId !== -1) {
            await axios.post(API_HOST + "lesson/" + this.props.lessonId + "/activity/template", entregable, { headers: { Authorization: cookies.get("token"), }, })
                .then(response => { alert("Entregable creado correctamente"); console.log(response.data); this.setState({ descEntregable: '', nameEntregable: '' }); })
                .catch(console.log)
        } else {
            console.log(this.props.lessonId)
        }
    }

    handleSubmitEntregable = async (event) => {
        event.preventDefault();
        alert("Agregaste un nuevo entregable!");
        let entregable = {
            id: null,
            name: this.state.nameEntregable,
            description: this.state.descEntregable,
            position: null,
            dueDate: null,
            startDate: null,
            rewards: null,
            lessonId: parseInt(cookies.get('lessonid'), 10),
            documents: [{
                activityId: null,
                name: this.state.nameEntregable,
                position: 0,
                dataType: "ENTREGABLE",
                data: ''
            }]
        }
        this.setEntregable(entregable);
    }


    render() {
        return (
            <form onSubmit={this.handleSubmitEntregable}>
                <label><h4>Título</h4></label><br />
                <Input type="text" name="nameEntregable" value={this.state.nameEntregable} placeholder="Ingrese el título de la actividad entregable" maxLength="30" onChange={(n) => { this.setState({ nameEntregable: n.target.value }) }} />
                <label><h4>Descripción</h4></label><br />
                <Input type="text" name="descEntregable" value={this.state.descEntregable} placeholder="Ingrese el título de la actividad entregable" maxLength="255" onChange={(n) => { this.setState({ descEntregable: n.target.value }) }} />
                <Button block color="primary" size="lg" type="submit">Crear Actividad</Button><br /><br />

            </form>
        )
    }
}