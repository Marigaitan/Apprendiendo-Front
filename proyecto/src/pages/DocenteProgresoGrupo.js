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


    render() {
        return (
            this.props.studentGroups.map(studentGroup => {
                return (
                    <div key={studentGroup.id}>
                        <Button size="lg" key={studentGroup.group.id} block onClick={() => this.openModalStudent(studentGroup.group.id)}>{studentGroup.group.name}</Button>
                        <Modal isOpen={this.state.openModal && this.state.modalId === studentGroup.group.id}>
                            <ModalHeader size='lg'>
                                {studentGroup.group.id}
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <h3>Progreso de la clase del grupo: </h3>
                                    {studentGroup.members.map(member => {
                                        return (
                                            studentGroup.id === member.id ?
                                                <Progress value={studentGroup.progress}>{studentGroup.progress}%</Progress>
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