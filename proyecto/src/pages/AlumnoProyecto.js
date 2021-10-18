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
            grupo: '', 
            integrantes:[], 
            lessons: [], 
            project: ''
        };
    }



     async getGroupMembers(studentId, projectId) {
        let grupo = (await axios.get("project/" + projectId + "/groups/student/" + studentId)).data;
        if(typeof grupo !== "undefined"){
            let miembros = (await axios.get("group/" + grupo.id + "/students")).data;
            return Promise.all(miembros.map( miembro => {
                return axios.get("user/" + miembro.studentId).then(response => ({name: response.data.username, role: miembro.groupRole}));
            }));
        }
        else return [];
    }


    async componentDidMount() {
        axios.defaults.headers.common['Authorization'] = cookies.get('token');
        axios.defaults.baseURL = API_HOST;
        console.log((await axios.get("project/" + cookies.get('projectid'))).data);
        console.log(await this.getGroupMembers(cookies.get('id'), cookies.get('projectid')));
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
