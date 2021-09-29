import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../css/Global.css';
import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import axios from 'axios';
import { Button } from 'reactstrap';
import LogoMini from '../Images/logoMini.png';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import  VerticalTimelineElement from './VerticalTimeLineElement';

//import 'react-vertical-timeline-component/style.min.css';

import VerticalTimeLineElement from '../css/VerticalTimeLineElement.css';


  
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


export default class AulaInvertida extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            subject: "", year: 0, division: "", teacherId: -1, teacherName: "", methodologies: [],
            methodologyId: -1, form: { name: '', fechaInicio: '', fechaFin: '' }
        };
    }
    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div>
                    Flipped Classroom
                    <VerticalTimeline>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            img={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Formular Pregunta Disparadora</h3>
                            <h4 className="vertical-timeline-element-subtitle">Clase 1 </h4>
                            <p>
                                Formular Pregunta Disparadora
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            date="2010 - 2011"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Art Director</h3>
                            <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                            <p>
                                Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2008 - 2010"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2006 - 2008"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="April 2013"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
    <p>
      Strategy, Social Media
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="November 2012"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
    <p>
      Creative Direction, User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2002 - 2006"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
    <p>
      Creative Direction, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    icon={LogoMini}
  />
</VerticalTimeline>
                    
                </div>

            </div>)
    }
}



