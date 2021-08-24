import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

const cookies = new Cookies();
let classparamUrl = "http://localhost:8080/classrooms/" + cookies.get('classid');

export default class AlumnoClassroom extends Component {
    classParam= async () => {
        await axios.get(classparamUrl , {
            headers: {
              'Authorization': cookies.get('token')
            }
          }) 
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                alert('error en la materia');
            })
    

    }
    render() {   
        console.log(cookies.get('classid'));
        window.onload = this.classParam;
        return (
            
            <div>
                Pantalla de la materia
            </div>
        )
    }
}
