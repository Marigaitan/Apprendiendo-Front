import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/MenuLogrosDocente.css';
import axios from 'axios';
import HeaderTeacher from "./Header"
import { API_HOST } from "../constants";
import { Alert, Badge, Button, Label } from 'reactstrap';

const cookies = new Cookies();

export default class MenuLogrosDocenteClase extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            noRewards: false,
            rewards: [],
            activity: {}
        };
    }
    async componentDidMount() {

        let activity = (await axios.get(API_HOST + "activity/" + this.props.location.state.activityId, { headers: { Authorization: cookies.get("token") } })).data;
        let rewards = (await axios.get(API_HOST + "activity/" + activity.id + "/rewards", { headers: { Authorization: cookies.get("token") } })).data;
        this.setState({
            activity: activity,
            rewards: rewards 
        });
        

    }

    //para que lo redirija al login si no hay token
    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            this.props.history.push("./");
        }
    }

    crearLogro = () => {
        this.props.history.push({
            pathname: "/menudocente/classroom/proyecto/actividad/logros/new",
            state: { activityId: this.state.activity.id }
        })
    }

    render() {

        this.redirect();

        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="full-width-div">
                    <h1>
                        {this.state.activity.name}
                    </h1>
                    <div>
                        {this.state.errorRewards ?
                            <div className="center-button">
                                <Alert color="danger">Hubo un error para cargar los logros de esta clase</Alert>
                            </div>
                            : this.state.noRewards ?
                                <div className="center-button">
                                    <Alert color="secondary">Todavía no hay logros para esta clase :(</Alert>
                                </div>
                                :
                                <div className="center-button">
                                    {this.state.rewards.map(reward =>
                                        <div key={reward.id} className="flex-center">
                                            <div>
                                                <img
                                                    src={`/medallas_cursos/${reward.imageData}.png`}
                                                    alt={reward.imageData}
                                                    width="50"
                                                />
                                            </div>
                                            <div>
                                                <Badge>{reward.name}</Badge>
                                            </div>
                                            <div>
                                                <Label>{reward.text}</Label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        }
                        <Button className="center-button" outline block color="primary" onClick={this.crearLogro}>Crear logro</Button>
                    </div>
                </div>
            </div>
        )
    }
}

//classrooms.map(classroom => "as")