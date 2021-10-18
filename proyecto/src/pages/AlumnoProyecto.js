import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';
import '../css/AlumnoProyecto.css';
import LogoMini from '../Images/logoMini.png';
import axios from 'axios';
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno"
import { VerticalTimeline } from 'react-vertical-timeline-component';
import VerticalTimelineElement from './VerticalTimeLineElement';
import PropTypes from 'prop-types';

const cookies = new Cookies();

VerticalTimeline.PropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    animate: PropTypes.bool,
    layout: PropTypes.oneOf([
        '1-column-left',
        '1-column',
        '2-columns',
        '1-column-right',
    ]),
};

VerticalTimeline.defaultProps = {
    animate: true,
    className: '',
    layout: '2-columns',
};

export default class AlumnoProyecto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grupo: '', integrantes:[], lessons: [], project: ''
        };
    }

    async componentDidMount() {

        let getProjectDetailsUrl = API_HOST + "project/" + cookies.get('projectid')
        //let getGrupoUrl = API_HOST +"project/" + cookies.get('projectid') + "/groups/student/" + cookies.get('id');
        //let getIntegrantes = API_HOST + "group/" + grupo.id + "students";
        let getLessonsUrl = API_HOST + "project/" + cookies.get('projectid') + "/lessons";

        //AXIOS
        const requestOne = axios.get(getProjectDetailsUrl, { headers: { 'Authorization': cookies.get('token') } });
        //const requestTwo = axios.get(getGrupoUrl, { headers: { 'Authorization': cookies.get('token') } });
        //const requestThree = axios.get(getIntegrantes, {headers: { 'Authorization': cookies.get('token') } });
        const requestFour = axios.get(getLessonsUrl, { headers: { 'Authorization': cookies.get('token') } });

        await axios.all([requestOne
            //, requestTwo, requestThree
            ,requestFour
        ])
            .then(axios.spread((project
                //, grupo, integrantes
                , lessons
            ) => {
                console.log(project.data,
                     //grupo.data,
                     //integrantes.data,
                     lessons.data
                );

                this.setState({
                    project: project.data,
                    //grupo: grupo.data,
                    //integrantes: integrantes.data,
                    lessons: lessons.data
                })
            }))
            .catch(error => {
                console.log(error)
            });
    }

    goLesson=(id)=> {
        this.props.history.push("/menualumno/classroom/proyecto/clase");
        cookies.set('lessonid', id, { path: "/" });
    }


    render() {
        return (
            <div className="mainContainer">
                <HeaderStudent />
                <div className="AlumnoProyecto">
                    <div>
                        <h2>{this.state.project.name}</h2>
                    </div>
                    <div className="myProject">
                        <div className="availableLessons">
                            <h2>Clases</h2>
                            <VerticalTimeline>
                            {this.state.lessons.map(lessons => { return (<div key={lessons.id} id={lessons.id}>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="2011 - present"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    img={LogoMini}
                                    iconOnClick ={()=>this.goLesson(lessons.id)}
                                    align = "alternate"
                                >
                                   <h3 className="vertical-timeline-element-title">{lessons.name}</h3>
                                   <h4 className="vertical-timeline-element-subtitle">{lessons.description}</h4>
                                
                                </VerticalTimelineElement>
                            </div>) })}
                            </VerticalTimeline>
                        </div>
                        <div className="myTeam">
                            <h2>Mi Equipo</h2>
                            <div>
                                {/* {this.state.integrantes.map(grupo => { return (<div key={integrantes.id} id={integrantes.id}><h3><li>{grupo}</li></h3></div>) })} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
