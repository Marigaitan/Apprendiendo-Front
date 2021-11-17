import React, { Component } from 'react'
import '../css/Global.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import axios from 'axios';
import NavDocente from './NavDocente';
import Accordion from './Accordion';



const cookies = new Cookies();
const accordionData = [
  {
    title: 'Proyecto 1',
    content: `otro acordeon por clase y adentro la lista de alumnos. O tabla de alumnos por clase y entregables`
  },
  {
    title: 'Proyecto 2',
    content: `Descripcion 2`
  },
  {
    title: 'Proyecto 3',
    content: `Descripcion 3`
  }
];

export default class DocenteEstatusClase extends Component {
  constructor(props) {        //constructor de mi clase
    super(props);
    this.state = { subject: "", year: 0, division: "", students: [], projects: []};
  }

  async componentDidMount() {
    let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
    let getProjectsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects";

    //AXIOS
    const requestOne = axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } });
    const requestTwo = axios.get(getProjectsUrl, { headers: { 'Authorization': cookies.get('token') } });

    axios.all([requestOne,
      requestTwo])
      .then(axios.spread((classData, projectsData) => {
        console.log(classData.data, projectsData.data);
        //SET DATA
        const subject = classData.data.subject;
        const year = classData.data.year;
        const division = classData.data.division;
        const projects = projectsData.data.map(project => ({ id: project.id, name: project.name }));

        //SET STATE
        this.setState({
          subject: subject,
          year: year,
          division: division,
          projects: projects,
        })}))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div>
          <div classname="navBar">
            <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
            <NavDocente activeBar='estatusclase' />
            <h3>Proyectos</h3>
            <div className="accordion">
              {accordionData.map(({ title, content }) => (
                <Accordion title={title} content={content} />
              ))}
            </div>
          </div><br />
        </div>
      </div>
    )
  }
}

