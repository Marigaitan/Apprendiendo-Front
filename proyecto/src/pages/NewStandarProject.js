import React, { Component } from 'react'
import '../css/Global.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import {API_HOST} from "../constants";
import axios from 'axios';

let newProjectUrl = API_HOST + "classroom/" + cookies.get('classid') + "/project";
const cookies = new Cookies();

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
                <div>
                    proyecto estandar
                </div>
                
            </div>
        )
    }
}
