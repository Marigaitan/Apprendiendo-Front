import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import {API_HOST} from "../constants";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import HeaderDocente from "./Header"

const cookies = new Cookies();
let getActivitiessUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects"+ cookies.get('projectid') + "/activities";

export default class DocenteProyecto extends Component {

    render() {
        return (
            <div>
                <HeaderDocente /> 
                Vista del Proyecto para el Docente
                <br/>
                <Button color="primary" size="lg">Crear Clase</Button>{' '}
            </div>
        )
    }
}
