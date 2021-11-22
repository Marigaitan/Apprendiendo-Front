import axios from "axios";
import React, { Component } from "react";
import { Alert, Label } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import HeaderTeacher from "./Header";
import '../css/DocenteEditLesson.css';
import ShowActivity from "./ShowActivity";

const cookies = new Cookies();

export default class CorregirActividades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: undefined,
            activities: [],
            alumnos: []
        };
    }

    async componentDidMount() {
        axios.defaults.headers.common["Authorization"] = cookies.get("token");
        axios.defaults.baseURL = API_HOST;
        this.setState({
            lesson: (await axios.get("lesson/" + cookies.get('lessonid'))).data,
        });
        this.setState({
            activities: (await axios.get("lesson/" + cookies.get('lessonid') + "/activities")).data.map(activity =>({ id: activity.documents.id, name: activity.documents.name})),
        });

        this.setState({
            alumnos: (await axios.get("classroom/" + cookies.get('classid') + "/students")).data.map(alumno => ({ id: alumno.id, username: alumno.username })),
        });
    }

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='newClaseForm'>
                    <div className='whiteBox'>
                        {/* aca va el nombre de la clase */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.name}</Label></h1>}
                        </div>
                        {/* aca va el enunciado */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.description}</Label></h1>}
                        </div>
                    </div>
                    <div className="whiteBox">
                    {this.state.alumnos.map((alumno) => {
                      return (
                        <h4
                          key={alumno.id}
                          id={alumno.id}
                        >
                          {alumno.username}
                          <ShowActivity studentID = {alumno.id} activities={this.activities} />
                            
                        </h4>
                      );
                    })}
                    </div>
                </div>
            </div>
        )
    }
}