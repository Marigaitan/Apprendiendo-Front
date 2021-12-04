import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavDocenteProyecto = (props) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink href="/menudocente/classroom" active={props.activeBar === 'classroom'}>Proyectos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/alumnos" active={props.activeBar === 'alumnos'}>Alumnos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/proyecto" active={props.activeBar === 'proyecto'}>Proyecto</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/menudocente/classroom/proyecto/logros/new" active={props.activeBar === 'logrosProyecto'}>Logros del proyecto</NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavDocenteProyecto;