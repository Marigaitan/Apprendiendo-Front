import React, { Component } from "react";
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";


export default class Conditions extends Component {

    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownTitle: 'Elegi una opcion'
        }
    }

    setCondicion = (condicion) => {
        this.setState({ dropdownTitle: condicion.text })
        this.props.parentCallback(condicion);
    }

    abrirCerrarDropdown = () => {
        this.setState(oldState => ({ dropdownOpen: !oldState.dropdownOpen }))
    }


    render() {
        const condiciones = this.props.condiciones;
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.abrirCerrarDropdown}>
                <DropdownToggle caret>
                    {this.state.dropdownTitle}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        condiciones.map(condicion => {
                            return(
                            <DropdownItem id={condicion.id} key={condicion.id} onClick={() => this.setCondicion(condicion)}>{condicion.text}</DropdownItem>
                            )
                        })
                    }
                    {/* <DropdownItem onClick={() => this.setCondicion(condiciones[0])}>{condiciones[0].text}</DropdownItem> */}
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}