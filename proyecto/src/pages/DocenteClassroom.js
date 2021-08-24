import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

const cookies = new Cookies();

export default class DocenteClassroom extends Component {
    render() {
        console.log(cookies.get('classid'));
        return (
            <div>
                pantalla de la classroom del docente
            </div>
        )
    }
}
