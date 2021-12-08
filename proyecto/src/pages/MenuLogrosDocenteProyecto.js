import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/MenuLogrosDocente.css';
import axios from 'axios';
import HeaderTeacher from "./Header"
import { API_HOST } from "../constants";
import NavDocenteProyecto from './NavDocenteProyecto';
import { Alert, Badge, Button, Label } from 'reactstrap';

const cookies = new Cookies();

export default class MenuLogrosDocenteProyecto extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            noRewards: false,
            rewards: [],
            project: {}
        };
    }
    async componentDidMount() {

        let project = (await axios.get("project/" + cookies.get("projectid"), { headers: { 'Authorization': cookies.get('token') } })).data;
        this.setState({ project: project });

        let rewardsUrl = API_HOST + "project/" + project.id + "/rewards";
        await axios.get(rewardsUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    var rewards = response.data.map(reward => ({
                        key: reward.id,
                        id: reward.id,
                        name: reward.name,
                        conditionId: reward.conditionId,
                        text: reward.text,
                        data: reward.data,
                        targetType: reward.targetType,
                        targetId: reward.targetId,
                        imageData: reward.imageData,
                        rewardType: reward.rewardType,
                    }));
                    console.log(rewards);
                    this.setState({ rewards: rewards });
                } else {
                    this.setState({ noRewards: true });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorRewards: true });
            })
    }


    //para que lo redirija al login si no hay token
    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            this.props.history.push("./");
        }
    }

    crearLogro = () => {
        this.props.history.push("/menudocente/classroom/proyecto/logros/new");
    }

    imageSource = (imageName) => {
        if (imageName == null) return '';
        if (imageName.startsWith("mc")) return `/medallas_cursos/${imageName}.png`;
        if (imageName.startsWith("b")) return `/avatars/${imageName}.png`;
        if (imageName.startsWith("o")) return `/accesorios/${imageName}.png`;
        if (imageName.startsWith("l")) return `/accesorios/${imageName}.png`;
        if (imageName.startsWith("r")) return `/accesorios/${imageName}.png`;
        else return `/medallas/${imageName}.png`;
    }

    render() {

        this.redirect();

        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="full-width-div">
                    <h1>
                        {this.state.project.name}
                    </h1>
                    <NavDocenteProyecto activeBar='logros' />
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
                                                    src={this.imageSource(reward.imageData)}
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