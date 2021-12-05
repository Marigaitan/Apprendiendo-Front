import axios from "axios";
import React, { Component } from "react";
import { Alert, Label, Table } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import HeaderTeacher from "./Header";
import '../css/DocenteEditLesson.css';
import ShowActivity from "./ShowActivity";
import ShowDocs from "./ShowDocs";

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
            activities: (await axios.get("lesson/" + cookies.get('lessonid') + "/activities")).data //.map(activity =>({ id: activity.documents[0].id, name: activity.documents[0].name})),
        });

        this.setState({
            alumnos: (await axios.get("classroom/" + cookies.get('classid') + "/students")).data.map(alumno => ({ id: alumno.id, username: alumno.username })),
        });

        console.log("lesson")
        console.log(this.state.lesson)
        console.log("activities")
        console.log(this.state.activities)
        console.log("alumnos")
        console.log(this.state.alumnos)
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
                    <div className="whiteTable">
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                        </th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Actividades resueltas
                                    </th>
                                    <th>
                                        Documentos subidos por los alumnos
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.alumnos.map((alumno, index) => {
                                    return (
                                        <tr key={alumno.id} id={alumno.id}>
                                            <th scope="row">
                                                {index + 1}
                                            </th>
                                            <td>
                                                {alumno.username}
                                            </td>
                                            <td className="width-table">
                                                <ShowActivity studentID={alumno.id} activities={this.state.activities} />
                                            </td>
                                            <td>
                                                <ShowDocs studentID= {alumno.id} activities={this.state.activities} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}