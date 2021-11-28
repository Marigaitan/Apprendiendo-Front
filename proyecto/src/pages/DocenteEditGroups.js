import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import "../css/Global.css";
import * as _ from "lodash";
import axios from "axios";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { API_HOST } from "../constants";
import HeaderTeacher from "./Header";

const cookies = new Cookies();

export default class DocenteEditGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            grupos: [],
            grupoNuevoAlumnos: [],
            alumnosSinGrupo: [],
            grupoSeleccionado: [],
            alumnosSinGrupoSeleccionados: [],
            openModal: false,
            modalId: -1,
            disabledButton: false,
        };
    }

    async componentDidMount() {
        axios.defaults.headers.common["Authorization"] = cookies.get("token");
        axios.defaults.baseURL = API_HOST;

        let project = (await axios.get("project/" + cookies.get("projectid"))).data;
        console.log(project);

        let groups = (await axios.get("/project/" + cookies.get("projectid") + "/groups")).data;
        console.log(groups);

        let students = (await axios.get("/classroom/" + cookies.get("classid") + "/students")).data;
        console.log(students);

        let alumnosSinGrupo = this.getAlumnosSinGrupo(groups, students);
        console.log(alumnosSinGrupo);

        this.setState({
            project: project,
            grupos: groups,
            students: students,
            alumnosSinGrupo: alumnosSinGrupo,
        });
    }

    getAlumnosSinGrupo = (groups, students) => {
        let alumnosSinGrupo = [];
        console.log(students)
        console.log(groups)
        if (students === null || students === undefined) {
            console.log("no hay students")
            console.log(students)
            return [];
        } else if (groups === null || groups === undefined || groups.length === 0) {
            console.log("no hay grupos")
            console.log(students)
            return students;
        } else {
            console.log("fui por el else")
            students.forEach(student => {
                if (groups.every(group => group.every(studentInGroup => student && studentInGroup && studentInGroup.id !== student.id)))
                    alumnosSinGrupo.push(student)
                console.log(alumnosSinGrupo)
            });
        }
        return alumnosSinGrupo;
    }

    openModal = (id) => {
        this.setState({ openModal: true, modalId: id, disabledButton: false, });
    }

    closeModal() {
        this.setState({ openModal: false, modalId: -1, alumnosSinGrupoSeleccionados: [] });
    }

    closeModalNuevoGrupo() {
        this.setState({ grupoNuevoAlumnos: [], });
        this.closeModal();
    }

    isChecked = (idAlumno, event) => {
        if (event.target.checked) {
            this.setState(prevState => ({
                alumnosSinGrupoSeleccionados: [...prevState.alumnosSinGrupoSeleccionados, idAlumno]
            }))
            console.log("agrego")
        } else {
            let alumnosSinGrupoSeleccionados = [...this.state.alumnosSinGrupoSeleccionados];
            const index = alumnosSinGrupoSeleccionados.indexOf(idAlumno);
            if (index > -1) alumnosSinGrupoSeleccionados.splice(index, 1)
            this.setState({ alumnosSinGrupoSeleccionados: alumnosSinGrupoSeleccionados })
            console.log("quito")
        }
        console.log(this.state.alumnosSinGrupoSeleccionados)
    }

    // ------------------------------------------------------------------------------ GRUPOS

    // ------------------------------------------------------------------------------ NUEVO GRUPO

    crearNuevoGrupo = () => {
        this.openModal(this.state.project.id);
    }

    agregarAlumnosAGrupoNuevo = async () => {
        //solo tengo los ids de grupoNuevoAlumnos
        
        let group = {
            id: undefined,
            projectId: this.state.project.id,
            name: "Grupo " + this.state.grupos.length + 1,
            progress: 0,
            project: this.state.project,
            members: this.state.alumnosSinGrupoSeleccionados.map(studentId => {

                let alumnosSinGrupo = [...this.state.alumnosSinGrupo];
                let studentWithoutGroup = _.remove(alumnosSinGrupo, { id: studentId })
                console.log("quito")
                this.setState({alumnosSinGrupo: alumnosSinGrupo})

                return {
                    studentId: studentId,
                    student: studentWithoutGroup[0]
                }
            })
        }
        console.log(group);
        await axios.post("/group", group)
            .then(response => {
                group.id = response.data
                this.setState(prevState => ({
                    grupos: [...prevState.grupos, group],
                    disabledButton: true,
                }))
            }).catch(err => { console.log(err); alert("hubo un error al enviar el grupo") })
    }

    // ------------------------------------------------------------------------------ EDITAR GRUPO

    editarGrupo = (group) => {
        this.setState({ grupoSeleccionado: group })
        this.openModal(group.id);
    }

    quitarAlumnoGrupo = (studentId) => {
        let grupoSeleccionado = [...this.state.grupoSeleccionado];

        _.remove(grupoSeleccionado, { id: studentId })
        console.log("quito")

        this.setState({grupoSeleccionado: grupoSeleccionado})
    }


    agregarAlumnosAGrupoExistente = (groupId) => {
        let grupoSeleccionado = [...this.state.grupoSeleccionado];
        let alumnosSinGrupoSeleccionados = [...this.state.alumnosSinGrupoSeleccionados];

        let nuevoGrupo = _.concat(grupoSeleccionado.members, alumnosSinGrupoSeleccionados)
        let grupos = [...this.state.grupos];

        let group = _.find(grupos, { id: groupId });

        group.members = nuevoGrupo //en teoria no haria falta actualizar la lista de la que me traje group porque esta referenciada. Revisar

        // todo enviar a axioss

        console.log("edito grupo")

        this.setState({ grupos: grupos, disabledButton: true })
    }

    getStudentsInGroupByGroupId = (groupId) => {
        let grupos = [...this.state.grupos];
        let group = _.find(grupos, { id: groupId });
        return group.members;
    }

    render() {
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="mainProyecto">
                    <div className="whitebox">
                        <h2>{this.state.project.name}</h2>
                    </div>
                    <div>
                        <Button onClick={() => this.props.history.goBack()}>Volver</Button>
                        <Button onClick={this.crearNuevoGrupo}>Nuevo grupo</Button>
                        <Modal isOpen={this.state.openModal && this.state.modalId === this.state.project.id}>
                            <ModalHeader>
                                Nuevo grupo
                            </ModalHeader>
                            <ModalBody>
                                Aca irian los alumnos con un checkbox y un boton para agregar a todos los seleccionados
                                {this.state.alumnosSinGrupo.map((alumno, index) =>
                                    <div key={alumno.id}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" id={"myinput" + index} onChange={(e) => this.isChecked(alumno.id, e)} />
                                                <Label for={"myinput" + index}>{alumno.username}</Label>
                                            </Label>
                                        </FormGroup>
                                    </div>
                                )
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.agregarAlumnosAGrupoNuevo} disabled={this.state.disabledButton}>Agregar grupo nuevo</Button>
                                <Button onClick={() => this.closeModalNuevoGrupo()}>Cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        {this.state.grupos.map(grupo =>
                            <div key={grupo.id}>
                                <Label>Grupo {grupo.id}</Label>
                                <Button onClick={() => this.editarGrupo(grupo)}>Editar</Button>
                                <Modal isOpen={this.state.openModal && this.state.modalId === grupo.id}>
                                    <ModalHeader>
                                        Editar grupo {grupo.id}
                                    </ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <div>
                                                Alumnos en el grupo
                                            </div>
                                            <div>
                                                Aca irian los alumnos con un boton para quitarlos si el profe quiere
                                                {this.getStudentsInGroupByGroupId(grupo.id).map(student =>
                                                    <div key={student.id}>
                                                        <Label>{student.username}</Label>
                                                        <Button onClick={() => this.quitarAlumnoGrupo(student.id)}>Quitar</Button>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Alumnos sin grupo
                                            </div>
                                            <div>
                                                <Button onClick={this.agregarAlumnosAGrupoExistente}>Agregar alumnos seleccionados al grupo</Button>
                                            </div>
                                            <div>
                                                Aca irian los alumnos con un checkbox y un boton para agregar a todos los seleccionados
                                                {this.state.alumnosSinGrupo.map(alumno =>
                                                    <div>
                                                        <Input type="checkbox" onChange={(e) => this.isChecked(alumno.id, e)}></Input>
                                                        <Label>{alumno.name}</Label>
                                                    </div>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={() => this.modificarGrupoExistente(grupo.id)}>Guardar cambios</Button>
                                        <Button onClick={() => this.closeModal()}>Cerrar</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}