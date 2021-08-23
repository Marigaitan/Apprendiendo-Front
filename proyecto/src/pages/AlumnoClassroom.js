import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';

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
