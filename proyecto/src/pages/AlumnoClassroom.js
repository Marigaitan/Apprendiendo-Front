import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

const cookies = new Cookies();

export default class AlumnoClassroom extends Component {
    
    render() {   
        console.log(cookies.get('classid'));
        return (
            
            <div>
                Pantalla de la materia
            </div>
        )
    }
}
