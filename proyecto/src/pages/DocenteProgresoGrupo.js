import axios from 'axios';
import React, { Component } from 'react';
import { Alert, Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import '../css/Global.css';
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class DocenteProgresoGrupo extends Component {


    openModalStudent = (id) => {
        this.setState({ openModal: true, modalId: id })
    }

    closeModal = () => {
        this.setState({ openModal: false, modalId: -1 })
    }

    constructor(props) {
        super(props);
        this.state = {
            openModal: false, modalId: -1, groups: []
        };
    }

    //TODO PASAR ESTO A DOCENTEPROYECTO PORQUE LLEGA NULO EN ESTE COMPONENTE EL PROP
    // YA ESTA PASADO VERLO AHI
    //async componentDidMount() {


        // let groups = []

        // this.props.studentGroups.forEach(studentGroup => {

        //     let getStudentsGroupProgressUrl = API_HOST + "group/" + studentGroup.id + "/progress";
        //     let getStudentsIdUrl = API_HOST + "group/" + studentGroup.id + "/students";

        //     //AXIOS
        //     const requestZero = axios.get(getStudentsGroupProgressUrl, { headers: { 'Authorization': cookies.get('token') } });
        //     const requestOne = axios.get(getStudentsIdUrl, { headers: { 'Authorization': cookies.get('token') } });

        //     var aGroup = axios.all([requestZero, requestOne])
        //         .then(axios.spread((progress, students) => {
        //             var aGroup = {
        //                 progress: progress.data,
        //                 id: studentGroup.id,
        //                 name: studentGroup.name,
        //                 studentIds: students.data.map(student => student.studentId),
        //                 studentNames: [],
        //             }
        //             return aGroup
        //         }))
        //         .catch((error) => console.log(error));



        //     aGroup.studentIds.forEach(studentId => {
        //         const getStudentUrl = API_HOST + "student/" + studentId;
        //         axios.get(getStudentUrl, { headers: { 'Authorization': cookies.get('token') } })
        //             .then(response => {
        //                 aGroup.studentNames.push(response.data.firstName + " " + response.data.lastName);
        //                 console.log(aGroup.studentNames)
        //             })
        //         })
        //     })
        //     this.setState({
        //         groups: groups
        //     })
            

    //}

    render() {
        return (
            this.props.studentGroups.map(studentGroup => {
                return (
                    <div key={studentGroup.id}>
                        <Button size="lg" key={studentGroup.id} block onClick={() => this.openModalStudent(studentGroup.id)}>{studentGroup.name}</Button>
                        <Modal isOpen={this.state.openModal && this.state.modalId === studentGroup.id}>
                            <ModalHeader size='lg'>
                                {studentGroup.id}
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <h3>Progreso de la clase del grupo: </h3>
                                    {this.state.groups.map(group => {
                                        return (
                                            group.id === studentGroup.id ?
                                                <Progress value={group.progress}>{group.progress}%</Progress>
                                                : <div></div>
                                        )
                                    })}
                                </div>
                                <br />
                                <div>
                                    <h3>Integrantes:</h3>
                                </div>
                                {/* <Alert color='warning'>
                                    {studentGroup.name}
                                     La idea es que haya grupos pero por el momento tengo solo ids de estudiantes
                                </Alert> */}
                                <ListGroup>
                                    {this.state.groups.map(group => {
                                        return (
                                            group.id === studentGroup.id ?
                                                group.studentNames.map(name =>
                                                    <ListGroupItem color="warning" key={name}>{name}</ListGroupItem>
                                                )
                                                : <div></div>
                                        )
                                    })}
                                </ListGroup>
                            </ModalBody>
                            <ModalFooter className="modalFooter">
                                <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            })
        )
    }
}