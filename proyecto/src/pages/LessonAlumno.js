import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno"
import '../css/Global.css';

const cookies = new Cookies();


export default class LessonAlumno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson:''
        };
    }


    async componentDidMount() {
        let getLessonUrl = API_HOST + "lesson/" + cookies.get('lessonid');
    
        const requestOne = axios.get(getLessonUrl, { headers: { 'Authorization': cookies.get('token') } });
    
        await axios.all([requestOne
        ])
            .then(axios.spread((lesson
            ) => {
                console.log(
                     lesson.data
                );
    
                this.setState({
                    lesson: lesson.data
                })
            }))
            .catch(error => {
                console.log(error)
            });
    }
    render() {
        return (
            <div className="mainContainer">
                <HeaderStudent />
                <div className="alumnoLesson">
                    <div>
                        <h2>{this.state.lesson.name}</h2>
                    </div>
                    <div className="myLesson"></div>
                    <div className="enunciado">
                        <h4>{this.state.lesson.description}</h4>
                    </div>

                </div>
            </div>
        )
    }
}
