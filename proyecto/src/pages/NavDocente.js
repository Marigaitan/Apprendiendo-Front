import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavDocente = (props) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink href="/menudocente/classroom" active={props.activeBar === 'classroom'}>Proyectos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/alumnos" active={props.activeBar === 'alumnos'}>Alumnos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/nuevoproyecto" active={props.activeBar === 'nuevoProyecto'}>Nuevo Proyecto</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/logros" active={props.activeBar === 'logros'}>Logros de la clase</NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavDocente;